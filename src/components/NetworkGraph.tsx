import '../styles/network.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, WheelEvent } from 'react';
import type { TabRecord } from '../domain/tab.ts';
import { buildGraph } from '../network/model.ts';
import { layoutGraph } from '../network/layout.ts';
import { relaxGraph } from '../network/forces.ts';
import { filterGraph, type GraphFilter } from '../network/filters.ts';
import { graphFit, graphZoomAt } from '../network/camera.ts';
import { pickGraphPoint } from '../network/hit.ts';
import { paintNetwork } from '../network/draw.ts';
import { graphColor, GRAPH_THEMES } from '../network/palette.ts';
import { graphStats } from '../network/metrics.ts';
import { graphKeyboard } from '../network/keyboard.ts';
import { minimapProjection } from '../network/minimap.ts';
import { parseGraphPreferences, DEFAULT_GRAPH_PREFS, GRAPH_PREF_KEY } from '../network/preferences.ts';
import type { GraphPoint, GraphViewport } from '../network/types.ts';
import { NetworkDetails } from './NetworkDetails.tsx';

const START_SIZE = { width: 1040, height: 600 };
type Props = { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void };
type Drag = { x: number; y: number; ox: number; oy: number; moved: boolean };

function loadPreferences() {
  try { return parseGraphPreferences(JSON.parse(localStorage.getItem(GRAPH_PREF_KEY) || 'null')); }
  catch { return { ...DEFAULT_GRAPH_PREFS }; }
}

export function NetworkGraph({ tabs, selected, onOpen }: Props) {
  const [prefs, setPrefs] = useState(loadPreferences);
  const [filter, setFilter] = useState<GraphFilter>('all');
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(START_SIZE);
  const [camera, setCamera] = useState<GraphViewport>({ x: 0, y: 0, zoom: 1 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<Drag | null>(null);
  const model = useMemo(() => buildGraph(tabs, prefs.group), [tabs, prefs.group]);
  const graph = useMemo(() => {
    const base = filterGraph(model, query, filter);
    const points = relaxGraph(layoutGraph(base), base.edges, base.points.length > 180 ? 7 : 22);
    return { ...base, points };
  }, [model,query,filter]);
  const stats = useMemo(() => graphStats(graph), [graph]);
  const chosen = graph.points.find(point => point.id === (hovered ?? focused ?? selected));
  const miniPoints = useMemo(() => minimapProjection(graph.points, 164,110), [graph.points]);

  useEffect(() => {
    try { localStorage.setItem(GRAPH_PREF_KEY, JSON.stringify(prefs)); } catch { /* storage can be blocked */ }
  }, [prefs]);
  useEffect(() => {
    if (!stage.current) return;
    const observer = new ResizeObserver(entries => {
      const rectangle = entries[0]?.contentRect;
      if (!rectangle) return;
      setSize(previous => Math.abs(previous.width-rectangle.width) < 1 && Math.abs(previous.height-rectangle.height) < 1 ? previous :
        { width: Math.max(1,rectangle.width), height: Math.max(1,rectangle.height) });
    });
    observer.observe(stage.current);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const onMedia = () => setReducedMotion(media.matches);
    media.addEventListener('change',onMedia);
    return () => {observer.disconnect(); media.removeEventListener('change',onMedia);};
  }, []);
  useEffect(() => { setCamera(graphFit(graph.points,size.width,size.height)); }, [graph.points,size.width,size.height]);

  useEffect(() => {
    const surface = canvas.current;
    if (!surface) return;
    const dpr = Math.min(2,window.devicePixelRatio || 1);
    surface.width = Math.max(1,Math.round(size.width*dpr));
    surface.height = Math.max(1,Math.round(size.height*dpr));
    const context = surface.getContext('2d', {alpha:true});
    if (!context) return;
    const animate = prefs.animated && !reducedMotion && document.visibilityState === 'visible';
    let frame=0, last=0;
    const paint=(now:number)=>{
      if (now-last>34 || !animate) {
        last=now;context.setTransform(dpr,0,0,dpr,0,0);
        paintNetwork(context,graph.points,graph.edges,camera,size.width,size.height,
          {theme:prefs.theme,showLinks:prefs.showLinks,highlight:hovered??focused??selected,time:now,glow:animate});
      }
      if (animate) frame=requestAnimationFrame(paint);
    };
    frame=requestAnimationFrame(paint);
    return ()=>cancelAnimationFrame(frame);
  },[size,camera,prefs,graph,hovered,focused,selected,reducedMotion]);

  function localPoint(e: PointerEvent<HTMLCanvasElement>) {
    const rect=e.currentTarget.getBoundingClientRect();
    return { x:e.clientX-rect.left,y:e.clientY-rect.top };
  }
  function pointerDown(e:PointerEvent<HTMLCanvasElement>) {
    if (e.button!==0)return;
    drag.current={x:e.clientX,y:e.clientY,ox:camera.x,oy:camera.y,moved:false};
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function pointerMove(e:PointerEvent<HTMLCanvasElement>) {
    if (drag.current) {
      const d=drag.current, dx=e.clientX-d.x,dy=e.clientY-d.y;
      if (Math.hypot(dx,dy)>4)d.moved=true;
      if (d.moved)setCamera(previous=>({...previous,x:d.ox+dx/previous.zoom,y:d.oy+dy/previous.zoom}));
      return;
    }
    const p=localPoint(e);
    setHovered(previous=>{const next=pickGraphPoint(graph.points,p.x,p.y,size.width,size.height,camera)?.id??null;return previous===next?previous:next;});
  }
  function pointerUp(e:PointerEvent<HTMLCanvasElement>) {
    const previous=drag.current;drag.current=null;
    if (!previous || previous.moved)return;
    const p=localPoint(e);
    const hit=pickGraphPoint(graph.points,p.x,p.y,size.width,size.height,camera);
    if(hit){setFocused(hit.id);onOpen(hit.tab);}
  }
  function wheel(e:WheelEvent<HTMLCanvasElement>){
    e.preventDefault();
    const r=e.currentTarget.getBoundingClientRect();
    setCamera(previous=>graphZoomAt(previous,e.deltaY,e.clientX-r.left,e.clientY-r.top,size.width,size.height));
  }
  function keys(e:KeyboardEvent<HTMLCanvasElement>){
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','=','Home'].includes(e.key)){
      e.preventDefault();
      setCamera(previous=>e.key==='Home'?graphFit(graph.points,size.width,size.height):graphKeyboard(previous,e.key));
    }
    if(e.key==='Enter' && chosen){e.preventDefault();onOpen(chosen.tab);}
  }
  function focusPoint(point:GraphPoint){setFocused(point.id);setCamera(previous=>({...previous,x:-point.x,y:-point.y}));}

  return <section className="network-shell" data-theme={prefs.theme} aria-label="Connected browser tabs graph">
    <header className="network-header">
      <div><div className="network-kicker">CONNECTED WORLDS / LIVE NETWORK</div><h3>Constellation map</h3><p>Obsidian-style connections, with real browser-tab relationships.</p></div>
      <div className="network-overview"><span><strong>{stats.planets}</strong> NODES</span><span><strong>{stats.links}</strong> LINKS</span><span><strong>{stats.groups}</strong> CLUSTERS</span></div>
    </header>
    <div className="network-content">
      <aside className="network-controls" aria-label="Network controls">
        <div className="network-control-title">GRAPH CONTROLS <button type="button" onClick={()=>setCamera(graphFit(graph.points,size.width,size.height))}>Reset view</button></div>
        <label className="network-field">Search tabs<input type="search" placeholder="Domain or tab name" value={query} onChange={e=>setQuery(e.target.value)} /></label>
        <label className="network-field">Group by<select value={prefs.group} onChange={e=>setPrefs(p=>({...p,group:e.target.value==='window'?'window':'domain'}))}><option value="domain">Website domains</option><option value="window">Browser windows</option></select></label>
        <label className="network-field">Show tabs<select value={filter} onChange={e=>setFilter(e.target.value as GraphFilter)}><option value="all">All tabs</option><option value="pinned">Pinned tabs</option><option value="playing">Playing audio</option><option value="active">Active tabs</option></select></label>
        <label className="network-field">Color palette<select value={prefs.theme} onChange={e=>setPrefs(p=>({...p,theme:GRAPH_THEMES.includes(e.target.value as typeof prefs.theme)?e.target.value as typeof prefs.theme:'obsidian'}))}>{GRAPH_THEMES.map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></label>
        <label className="network-check"><input type="checkbox" checked={prefs.showLinks} onChange={e=>setPrefs(p=>({...p,showLinks:e.target.checked}))}/> Connection lines</label>
        <label className="network-check"><input type="checkbox" checked={prefs.animated} onChange={e=>setPrefs(p=>({...p,animated:e.target.checked}))}/> Animate nebula</label>
        <div className="network-help">Drag to pan · Scroll to zoom · Arrow keys to move · Home to fit all · Click to open a tab</div>
      </aside>
      <div className="network-stage" ref={stage}>
        {graph.points.length ? <canvas ref={canvas} tabIndex={0} className="network-canvas" role="img" aria-label={`Interactive graph containing ${stats.planets} tabs and ${stats.links} connections. Use the tab list for screen-reader access.`}
          onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={()=>{drag.current=null;}} onPointerLeave={()=>setHovered(null)} onWheel={wheel} onKeyDown={keys}/>
        : <div className="network-empty" role="status">No matching worlds. Try clearing your filters.</div>}
        <div className="network-zoom" aria-label="Graph zoom controls"><button type="button" onClick={()=>setCamera(p=>({...p,zoom:Math.min(4,p.zoom*1.2)}))}>+</button><span>{Math.round(camera.zoom*100)}%</span><button type="button" onClick={()=>setCamera(p=>({...p,zoom:Math.max(.25,p.zoom/1.2)}))}>−</button><button type="button" onClick={()=>setCamera(graphFit(graph.points,size.width,size.height))}>Fit all</button></div>
        {graph.points.length>0 && <div className="network-minimap" aria-label="Galaxy mini map"><div>OVERVIEW</div><svg viewBox="0 0 164 110" role="img" aria-label="Overview of tab positions">{miniPoints.map(p=><circle key={p.id} cx={p.x} cy={p.y} r={p.id===(hovered??focused??selected)?3.2:1.75} fill={graphColor(p.colorIndex,prefs.theme)} />)}</svg></div>}
        <div className="network-corner-note">PRIVATE BY DESIGN · LIVE TABS</div>
      </div>
      <div className="network-right"><NetworkDetails point={chosen} onOpen={onOpen}/><div className="network-node-list"><div className="network-kicker">JUMP TO A WORLD</div>{graph.points.slice(0,60).map(p=><button type="button" key={p.id} onClick={()=>focusPoint(p)}><span style={{background:graphColor(p.colorIndex,prefs.theme)}}/><span title={p.tab.title}>{p.tab.title}</span></button>)}{graph.points.length>60&&<p>Showing 60 of {graph.points.length} tabs. Use search to narrow.</p>}</div></div>
    </div>
  </section>;
}

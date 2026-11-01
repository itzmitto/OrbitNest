import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import type { TabRecord } from '../domain/tab';
import { createPlanetNodes, findPlanet, PLANET_KINDS, type PlanetNode } from '../graph/planet-system';
import { filterPlanetNodes, isPlanetFilter, type PlanetFilter } from '../graph/planet-filter';
import { PlanetRenderer } from '../graph/planet-webgl';
import { drawUniverse } from '../graph/draw';
import { PlanetCatalog } from './PlanetCatalog';
import { Starfield } from './Starfield';
import { NebulaClouds } from './NebulaClouds';
import { UniverseMinimap } from './UniverseMinimap';
import {frameInterval,showDetailedRings,parseRenderQuality} from '../domain/render-quality';
import { parseStarDensity, STAR_COUNTS } from '../domain/star-density';
import { PlanetDetails } from './PlanetDetails';
import { centerOnPlanet, zoomAtPoint } from '../graph/camera';
import { layoutPlanets } from '../graph/layout';
import { useScene } from '../hooks/useScene';
import { useOrbitLines } from '../hooks/useOrbitLines';
import { useAnimationSpeed } from '../hooks/useAnimationSpeed';
import { ANIMATION_FACTORS } from '../domain/animation-speed';
import { parseCameraPreference } from '../domain/camera-preferences';
import { keyboardCameraOffset, type NavigationCommand } from '../graph/keyboard-navigation';
import { parseGalaxyLayout } from '../graph/layout-mode';
import { fitPlanetCamera } from '../graph/fit-camera';
import { visiblePlanetLabels } from '../graph/label-layout';
import { cyclePlanetFocus } from '../graph/planet-navigation';
import { galaxyMetrics } from '../graph/galaxy-metrics';
import { parseGalaxyPalette } from '../domain/galaxy-palette';
import { adaptiveStarBudget } from '../domain/star-budget';
import { toggleGalaxyFullscreen } from '../graph/fullscreen';
import { selectionHalo } from '../graph/selection-halo';
import { searchPlanetNodes } from '../graph/planet-search';
import { UniverseHelp } from './UniverseHelp';

type Props = { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void; demo: boolean; onPin: (tab: TabRecord) => void; onMute: (tab: TabRecord) => void; onClose: (tab: TabRecord) => void };
type DragState = { x: number; y: number; originX: number; originY: number; moved: boolean };
const INITIAL_VIEWPORT = { width: 960, height: 590 };

export function UniverseCanvas({ tabs, selected, onOpen, demo, onPin, onMute, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<PlanetRenderer | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const motionRef = useRef(0);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => { const onChange = () => setFullScreen(document.fullscreenElement === containerRef.current); document.addEventListener('fullscreenchange', onChange); return () => document.removeEventListener('fullscreenchange', onChange); }, []);
  const { scene, setScene } = useScene();
  const [palette, setPalette] = useState(() => { try { return parseGalaxyPalette(localStorage.getItem('orbitnest:palette:v1')); } catch { return parseGalaxyPalette(null); } });
  useEffect(() => { try { localStorage.setItem('orbitnest:palette:v1', palette); } catch { /* local-only preference */ } }, [palette]);
  const [starDensity, setStarDensity]=useState(()=>{try{return parseStarDensity(localStorage.getItem('orbitnest:stars:v1'));}catch{return parseStarDensity(null);}});
  useEffect(()=>{try{localStorage.setItem('orbitnest:stars:v1',starDensity);}catch{/* storage can be blocked */}},[starDensity]);
  const { showOrbits, setShowOrbits } = useOrbitLines();
  const { speed, setSpeed } = useAnimationSpeed();
  const [initialCamera] = useState(() => {
    try { return parseCameraPreference(localStorage.getItem('orbitnest:camera:v1')); }
    catch { return parseCameraPreference(null); }
  });
  const [zoom, setZoom] = useState(initialCamera.zoom);
  const [offset, setOffset] = useState(initialCamera.offset);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [keyboardFocusedId, setKeyboardFocusedId] = useState<number | null>(null);
  const [kindFilter, setKindFilter] = useState<PlanetFilter>('all');
  const [planetQuery, setPlanetQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState(() => { try { return parseGalaxyLayout(localStorage.getItem('orbitnest:layout:v1')); } catch { return parseGalaxyLayout(null); } });
  useEffect(() => { try { localStorage.setItem('orbitnest:layout:v1',layoutMode); } catch { /* privacy mode */ } },[layoutMode]);
  const [paused, setPaused] = useState(false);
  const [quality,setQuality]=useState(()=>{try{return parseRenderQuality(localStorage.getItem('orbitnest:quality:v1'));}catch{return parseRenderQuality(null);}});
  useEffect(()=>{try{localStorage.setItem('orbitnest:quality:v1',quality);}catch{/* local preferences only */}},[quality]);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || document.visibilityState === 'visible');
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [webglFallback, setWebglFallback] = useState(false);
  const allNodes = useMemo(() => createPlanetNodes(tabs, viewport.width, viewport.height, zoom, offset, layoutMode), [tabs, viewport, zoom, offset, layoutMode]);
  const nodes = useMemo(() => searchPlanetNodes(filterPlanetNodes(allNodes, kindFilter), planetQuery), [allNodes, kindFilter, planetQuery]);
  const highlightedId = keyboardFocusedId ?? selected;
  const labelNodes = useMemo(() => visiblePlanetLabels(nodes, [keyboardFocusedId, hoveredId, selected]), [nodes, keyboardFocusedId, hoveredId, selected]);
  const stats = useMemo(() => galaxyMetrics(nodes), [nodes]);
  const halo = useMemo(() => selectionHalo(nodes, highlightedId), [nodes, highlightedId]);
  const hovered = nodes.find(node => node.id === hoveredId);
  const active = nodes.find(node => node.id === highlightedId);
  const activeBrowserTab = tabs.find(tab => tab.active);
  const motionStopped = paused || reducedMotion || !pageVisible;

  // Persist camera state at a low frequency while dragging or zooming.
  useEffect(() => {
    const id = window.setTimeout(() => {
      try { localStorage.setItem('orbitnest:camera:v1', JSON.stringify({ zoom, offset })); }
      catch { /* storage may be blocked */ }
    }, 300);
    return () => window.clearTimeout(id);
  }, [zoom, offset]);

  // A background extension dashboard should never keep rendering unseen frames.
  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      setViewport(previous => Math.abs(previous.width - width) < 1 && Math.abs(previous.height - height) < 1 ? previous : { width: Math.max(1, width), height: Math.max(1, height) });
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => { observer.disconnect(); media.removeEventListener('change', onChange); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || webglFallback) return;
    try {
      rendererRef.current = new PlanetRenderer(canvas);
    } catch (error) {
      console.warn('[OrbitNest] Switching to 2D planet fallback:', error);
      rendererRef.current = null;
      setWebglFallback(true);
    }
    return () => { rendererRef.current?.dispose(); rendererRef.current = null; };
  }, [webglFallback]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(viewport.width * dpr);
    canvas.height = Math.round(viewport.height * dpr);
    let frameId = 0;
    let previousTime = 0;
    let lastPaint = 0;
    const drawFrame = (now: number) => {
      const step = previousTime ? Math.min((now - previousTime) / 1000, 0.06) : 0;
      previousTime = now;
      if (!motionStopped) motionRef.current += step * ANIMATION_FACTORS[speed];
      if (now - lastPaint > frameInterval(nodes.length,quality) || motionStopped) {
        lastPaint = now;
        if (rendererRef.current && !webglFallback) {
          rendererRef.current.render(nodes, viewport.width, viewport.height, motionRef.current, highlightedId, showDetailedRings(nodes.length,quality));
        } else {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const fallbackPoints = layoutPlanets(tabs, viewport.width, viewport.height).map(point => {
              const n = nodes.find(node => node.id === point.id);
              return n ? { ...point, x: n.x, y: n.y, r: n.r } : point;
            });
            drawUniverse(ctx, viewport.width, viewport.height, fallbackPoints, highlightedId);
          }
        }
      }
      if (!motionStopped) frameId = window.requestAnimationFrame(drawFrame);
    };
    frameId = window.requestAnimationFrame(drawFrame);
    return () => window.cancelAnimationFrame(frameId);
  }, [tabs, nodes, highlightedId, viewport, motionStopped, webglFallback, speed, quality]);

  // Native non-passive wheel listener: prevent page scrolling only over the planet map.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // Preserve browser pinch gestures.
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const next = zoomAtPoint(zoom, offset, { x: event.clientX - rect.left, y: event.clientY - rect.top }, viewport.width, viewport.height, event.deltaY);
      setZoom(next.zoom);
      setOffset(next.offset);
    };
    canvas.addEventListener('wheel', wheel, { passive: false });
    return () => canvas.removeEventListener('wheel', wheel);
  }, [zoom, offset, viewport]);
  const changeZoom = (delta: number) => setZoom(previous => Math.max(0.55, Math.min(2.25, Math.round((previous + delta) * 100) / 100)));
  const pickNode = (event: PointerEvent<HTMLCanvasElement>): PlanetNode | undefined => {
    const rect = event.currentTarget.getBoundingClientRect();
    return findPlanet(nodes, event.clientX - rect.left, event.clientY - rect.top);
  };
  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (drag) {
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.hypot(dx, dy) > 5) drag.moved = true;
      if (drag.moved) setOffset({ x: drag.originX + dx, y: drag.originY + dy });
      return;
    }
    const nextId = pickNode(event)?.id ?? null;
    setHoveredId(previous => previous === nextId ? previous : nextId);
  };
  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.moved) return;
    const node = pickNode(event);
    if (node) { setKeyboardFocusedId(node.id); onOpen(node.tab); }
  };
  const onCanvasKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === '[' || event.key === ']') {
      event.preventDefault();
      setKeyboardFocusedId(previous => cyclePlanetFocus(nodes, previous ?? selected, event.key === ']' ? 1 : -1));
      return;
    }
    if (event.key === 'Enter' && active) { event.preventDefault(); onOpen(active.tab); return; }
    if (event.key === 'Escape') { setKeyboardFocusedId(null); return; }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) {
      event.preventDefault();
      setOffset(previous => keyboardCameraOffset(event.key as NavigationCommand, previous));
    } else if (event.key === '+' || event.key === '=') { event.preventDefault(); changeZoom(0.2); }
    else if (event.key === '-') { event.preventDefault(); changeZoom(-0.2); }
    else if (event.key === '0') { event.preventDefault(); setZoom(1); setOffset({ x: 0, y: 0 }); }
  };
  const ringCount = Math.min(8, Math.max(2, Math.ceil(Math.sqrt(tabs.length / 3.5))));
  const rings = Array.from({ length: ringCount }, (_, index) => {
    const scale = (index + 1) / ringCount;
    return { rx: viewport.width * 0.435 * scale * zoom, ry: viewport.height * 0.405 * scale * zoom };
  });
  return (
    <div className="planetarium-shell" data-scene={scene} data-palette={palette}>
      <div className="planetarium-header">
        <div className="planetarium-brand"><span className="planetarium-live-dot" /> <strong>THE ORBITNEST SYSTEM</strong><span>{tabs.length} celestial tabs</span></div>
        <label className="scene-select">SPACE ENVIRONMENT
          <select aria-label="Space environment" value={scene} onChange={event => setScene(event.target.value as typeof scene)}>
            <option value="deep-space">Deep Space</option><option value="nebula">Nebula</option><option value="starlight">Starlight</option>
          </select>
        </label>
      </div>
      <label className="galaxy-layout-select">COLOR MOOD
        <select aria-label="Galaxy color mood" value={palette} onChange={event => setPalette(parseGalaxyPalette(event.target.value))}>
          <option value="midnight">Midnight</option><option value="aurora">Aurora</option><option value="ember">Supernova</option>
        </select>
      </label>
      <label className="galaxy-layout-select">RENDER MODE
        <select aria-label="Render quality" value={quality} onChange={event=>setQuality(parseRenderQuality(event.target.value))}>
          <option value="auto">Automatic</option><option value="battery">Battery saver</option><option value="cinematic">Cinematic</option>
        </select>
      </label>
      <label className="galaxy-layout-select">STAR DETAIL
        <select aria-label="Star density" value={starDensity} onChange={event=>setStarDensity(parseStarDensity(event.target.value))}>
          <option value="minimal">Minimal</option><option value="classic">Classic</option><option value="cinematic">Cinematic</option>
        </select>
      </label>
      <label className="galaxy-layout-select">GALAXY SHAPE
        <select aria-label="Galaxy arrangement" value={layoutMode} onChange={event => setLayoutMode(parseGalaxyLayout(event.target.value))}>
          <option value="orbits">Solar orbits</option><option value="spiral">Golden spiral</option>
        </select>
      </label>
      <label className="planet-family-picker">PLANET FAMILY
        <select aria-label="Filter planets by type" value={kindFilter} onChange={event => {
          const next = event.target.value;
          if (isPlanetFilter(next)) setKindFilter(next);
        }}>
          <option value="all">All planet types</option>
          {PLANET_KINDS.map(kind => <option key={kind} value={kind}>{kind[0].toUpperCase() + kind.slice(1)}</option>)}
        </select>
        <span>{nodes.length} visible</span>
      </label>
      <div className="planetarium-local-search"><label htmlFor="planetarium-find">FIND IN THIS GALAXY</label>
        <input id="planetarium-find" type="search" value={planetQuery} onChange={event => setPlanetQuery(event.target.value)} placeholder="Find a planet, website or type…" />
        {planetQuery && <button type="button" onClick={() => setPlanetQuery('')} aria-label="Clear galaxy search">Clear</button>}
      </div>
      <div className="galaxy-live-metrics" aria-label="Visible galaxy statistics">
        <span><strong>{stats.worlds}</strong> worlds</span><span><strong>{stats.sectors}</strong> sectors</span>
        <span><strong>{stats.families}</strong> planet types</span><span><strong>{stats.pinned}</strong> pinned</span>
        <span><strong>{stats.audible}</strong> playing audio</span>
      </div>
      <div className="planetarium-stage" ref={containerRef}>
        <div className="planetarium-nebula" aria-hidden="true" />
        <NebulaClouds />
        <Starfield density={adaptiveStarBudget(STAR_COUNTS[starDensity], nodes.length, quality, reducedMotion)} />
        {showOrbits && layoutMode === 'orbits' && <svg className="planetarium-orbits" viewBox={`0 0 ${viewport.width} ${viewport.height}`} aria-hidden="true">
          <defs><linearGradient id="orbitGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#78c6fe" stopOpacity="0.1" /><stop offset="0.55" stopColor="#7c85dc" stopOpacity="0.3" /><stop offset="1" stopColor="#83fcda" stopOpacity="0.09" /></linearGradient></defs>
          {rings.map((ring, index) => <ellipse key={index} cx={viewport.width / 2 + offset.x} cy={viewport.height / 2 + offset.y} rx={ring.rx} ry={ring.ry} fill="none" stroke="url(#orbitGlow)" strokeWidth="1" strokeDasharray={index % 2 ? '3 7' : undefined} />)}
        </svg>}
        <div className="planetarium-core" aria-hidden="true" style={{ left: viewport.width / 2 + offset.x, top: viewport.height / 2 + offset.y }}><span /></div>
        <canvas key={webglFallback ? 'canvas-2d' : 'canvas-3d'} ref={canvasRef} className="planetarium-webgl" aria-label={`${tabs.length} rotating planet representations of open tabs. Use arrow keys to pan, square brackets to choose planets, Enter to open a selected planet, plus or minus to zoom, zero to reset. Choose Galaxy List to open tabs with the keyboard.`} role="group" tabIndex={0} onKeyDown={onCanvasKeyDown}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          onPointerCancel={() => { dragRef.current = null; }} onPointerLeave={() => setHoveredId(null)} />
        {halo && <div className="planetarium-selection-halo" aria-hidden="true" style={{ left: halo.left, top: halo.top, width: halo.diameter, height: halo.diameter }} />}
        <div className="planetarium-label-layer" aria-hidden="true">
          {labelNodes.map(node => (
            <div key={node.id} className={`planetarium-planet-label${highlightedId === node.id ? ' selected' : ''}${hoveredId === node.id ? ' hovered' : ''}`}
              style={{ left: node.x, top: node.y + node.r + 12 }}>
              <strong>{node.tab.domain}</strong>
              {(selected === node.id || hoveredId === node.id) && <small>{node.tab.title}</small>}
            </div>
          ))}
        </div>
        <div className="planetarium-hud">
          <span className="planetarium-hud-title">MISSION NAVIGATION <em>{webglFallback ? '2D FALLBACK' : 'LIVE 3D'}</em></span>
          <div className="planetarium-zoom-actions" role="group" aria-label="Universe controls">
            <button type="button" aria-label="Zoom out" onClick={() => changeZoom(-0.2)}>−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" aria-label="Zoom in" onClick={() => changeZoom(0.2)}>+</button>
            <button type="button" onClick={() => { setOffset({ x: 0, y: 0 }); setZoom(1); }}>Reset</button>
            <button type="button" title="Fit all visible planets into the universe" onClick={() => {
              const originals=createPlanetNodes(tabs,viewport.width,viewport.height,1,{x:0,y:0},layoutMode);
              const next=fitPlanetCamera(filterPlanetNodes(originals,kindFilter),viewport);
              setZoom(next.zoom);setOffset(next.offset);
            }}>Fit all</button>
            <button type="button" title="Toggle fullscreen universe" aria-pressed={fullScreen} onClick={() => { const el = containerRef.current; if (el) void toggleGalaxyFullscreen(el); }}>{fullScreen ? "Exit fullscreen" : "Fullscreen"}</button>
            <button type="button" aria-pressed={showOrbits} onClick={() => setShowOrbits(v => !v)}>{showOrbits ? '◎ Orbits' : '◌ Orbits'}</button>
            <label className="rotation-speed"><span>SPIN</span><select aria-label="Planet rotation speed" value={speed} onChange={event => setSpeed(event.target.value as typeof speed)} disabled={reducedMotion}>
              <option value="drift">Drift</option><option value="normal">Normal</option><option value="hyperdrive">Hyperdrive</option>
            </select></label>
            <button type="button" disabled={!activeBrowserTab} title="Center on the active browser tab" onClick={() => {
              if (activeBrowserTab) setOffset(previous => centerOnPlanet(nodes, activeBrowserTab.id, viewport.width, viewport.height, previous));
            }}>⌖ Focus</button>
            <button type="button" aria-pressed={motionStopped} onClick={() => setPaused(previous => !previous)} disabled={reducedMotion} title={reducedMotion ? 'Reduced motion is enabled in your system settings' : undefined}>{motionStopped ? '▶ Play' : 'Ⅱ Pause'}</button>
          </div>
        </div>
        {(hovered || active) && <div className="planetarium-inspector" role="status"><span>{(hovered || active)?.kind.toUpperCase()} PLANET</span><strong>{(hovered || active)?.tab.title}</strong><small>{(hovered || active)?.tab.domain} · Click planet to switch tab</small></div>}
        {nodes.length === 0 && <div className="planetarium-empty">No planets of this type in this sector. Choose another filter.</div>}
        <UniverseMinimap nodes={nodes} selected={highlightedId} onFocus={id=>setOffset(previous=>centerOnPlanet(nodes,id,viewport.width,viewport.height,previous))}/>
        <div className="planetarium-navigation-hint">DRAG TO PAN <i /> USE + / − TO ZOOM <i /> SELECT A PLANET TO OPEN ITS TAB</div>
      </div>
      <UniverseHelp />
      <PlanetDetails tab={(active || hovered)?.tab} onOpen={onOpen} demo={demo} onPin={onPin} onMute={onMute} onClose={onClose} />
      <PlanetCatalog tabs={nodes.map(node => node.tab)} onOpen={onOpen} />
      <div className="planetarium-footer"><span>ORBITAL MAP / LIVE TAB NETWORK</span><span>PRIVATE BY DESIGN · YOUR TABS STAY IN YOUR BROWSER</span></div>
    </div>
  );
}

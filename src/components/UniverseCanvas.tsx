import { useEffect, useRef, useState } from 'react';
import type { TabRecord } from '../domain/tab';
import { drawUniverse, type PlanetPoint } from '../graph/draw';
import { layoutPlanets } from '../graph/layout';
import { hitPlanet } from '../graph/hit';
export function UniverseCanvas({ tabs, selected, onOpen }: { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void }) {
  const ref=useRef<HTMLCanvasElement>(null);
  const [zoom,setZoom]=useState(1);
  const [offset,setOffset]=useState({x:0,y:0});
  const [hovered,setHovered]=useState<TabRecord|null>(null);
  const drag=useRef<{x:number;y:number;originX:number;originY:number;moved:boolean}|null>(null);
  const points=useRef<PlanetPoint[]>([]);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const render=()=>{
      const box=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);
      const width=Math.max(1,box.width),height=Math.max(1,box.height);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      const ctx=canvas.getContext('2d');if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);
      points.current=layoutPlanets(tabs,width,height).map(p=>({...p,x:width/2+(p.x-width/2)*zoom+offset.x,y:height/2+(p.y-height/2)*zoom+offset.y,r:p.r*Math.min(zoom,1.7)}));
      drawUniverse(ctx,width,height,points.current,selected);
    };
    render();const observer=new ResizeObserver(render);observer.observe(canvas);return()=>observer.disconnect();
  },[tabs,selected,zoom,offset]);
  return <div className="canvas-frame"><div className="canvas-actions"><button onClick={()=>setZoom(z=>Math.max(.5,+(z-.2).toFixed(2)))} aria-label="Zoom out">−</button><span>{Math.round(zoom*100)}%</span><button onClick={()=>setZoom(z=>Math.min(2.5,+(z+.2).toFixed(2)))} aria-label="Zoom in">+</button><button onClick={()=>{setZoom(1);setOffset({x:0,y:0});}}>Reset</button></div>{hovered && <div className="planet-tooltip" role="status"><strong>{hovered.title}</strong><small>{hovered.domain}</small></div>}<canvas ref={ref} className="universe-canvas" role="img" aria-label={`Universe preview showing ${tabs.length} planets. Use Galaxy List for keyboard access.`} onPointerDown={(event)=>{drag.current={x:event.clientX,y:event.clientY,originX:offset.x,originY:offset.y,moved:false};event.currentTarget.setPointerCapture(event.pointerId);}}
    onPointerMove={(event)=>{if(!drag.current){const box=event.currentTarget.getBoundingClientRect();setHovered(hitPlanet(points.current,event.clientX-box.left,event.clientY-box.top)?.tab??null);return;}const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;if(Math.hypot(dx,dy)>5)drag.current.moved=true;if(drag.current.moved)setOffset({x:drag.current.originX+dx,y:drag.current.originY+dy});}}
    onPointerUp={(event)=>{const start=drag.current;drag.current=null;if(!start||start.moved)return;const box=event.currentTarget.getBoundingClientRect();const planet=hitPlanet(points.current,event.clientX-box.left,event.clientY-box.top);if(planet)onOpen(planet.tab);}}
    onPointerCancel={()=>{drag.current=null;}} onPointerLeave={()=>setHovered(null)} /></div>;
}

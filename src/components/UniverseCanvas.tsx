import { useEffect, useRef } from 'react';
import type { TabRecord } from '../domain/tab';
import { drawUniverse, type PlanetPoint } from '../graph/draw';
import { layoutPlanets } from '../graph/layout';
export function UniverseCanvas({ tabs, selected, onOpen }: { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void }) {
  const ref=useRef<HTMLCanvasElement>(null);
  const points=useRef<PlanetPoint[]>([]);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const render=()=>{
      const box=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);
      const width=Math.max(1,box.width),height=Math.max(1,box.height);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      const ctx=canvas.getContext('2d');if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);
      points.current=layoutPlanets(tabs,width,height);
      drawUniverse(ctx,width,height,points.current,selected);
    };
    render();const observer=new ResizeObserver(render);observer.observe(canvas);return()=>observer.disconnect();
  },[tabs,selected]);
  return <canvas ref={ref} className="universe-canvas" role="img" aria-label={`Universe preview showing ${tabs.length} planets. Use Galaxy List for keyboard access.`} onClick={()=>{void onOpen;}} />;
}

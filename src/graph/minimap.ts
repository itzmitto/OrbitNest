import type {PlanetNode} from './planet-system';
export type MiniPoint={id:number;x:number;y:number;active:boolean};
/** Fit a galaxy into a tiny navigator; points never expose URLs or page content. */
export function createMinimap(nodes:readonly PlanetNode[],selected:number|null):MiniPoint[] {
  if(!nodes.length)return [];
  const minX=Math.min(...nodes.map(n=>n.x-n.r)),maxX=Math.max(...nodes.map(n=>n.x+n.r));
  const minY=Math.min(...nodes.map(n=>n.y-n.r)),maxY=Math.max(...nodes.map(n=>n.y+n.r));
  const spanX=Math.max(1,maxX-minX),spanY=Math.max(1,maxY-minY);
  return nodes.slice(0,100).map(n=>({id:n.id,x:8+(n.x-minX)/spanX*84,y:8+(n.y-minY)/spanY*84,active:selected===n.id}));
}

import type { PlanetNode } from './planet-system';
export type FitViewport = { width: number; height: number };
/** Computes a camera that fits existing planet positions, including their radii. */
export function fitPlanetCamera(nodes: readonly PlanetNode[], viewport: FitViewport, padding = 65) {
  const width=viewport.width, height=viewport.height;
  if (!nodes.length || width <= 0 || height <= 0) return { zoom: 1, offset: {x:0,y:0} };
  const left=Math.min(...nodes.map(n=>n.x-n.r));
  const right=Math.max(...nodes.map(n=>n.x+n.r));
  const top=Math.min(...nodes.map(n=>n.y-n.r));
  const bottom=Math.max(...nodes.map(n=>n.y+n.r));
  const zoom=Math.max(0.55,Math.min(2.25,(width-2*padding)/Math.max(1,right-left),(height-2*padding)/Math.max(1,bottom-top)));
  const centerX=(left+right)/2, centerY=(top+bottom)/2;
  return {zoom,offset:{x:(width/2-centerX)*zoom,y:(height/2-centerY)*zoom}};
}

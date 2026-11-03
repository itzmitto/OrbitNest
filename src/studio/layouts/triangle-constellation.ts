import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Triangle Constellation: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutTriangleConstellation:StudioLayout={id:'triangle-constellation',label:'Triangle Constellation',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const row=Math.floor((Math.sqrt(8*i+1)-1)/2),offset=i-row*(row+1)/2;const {x,y}={x:(offset-row/2)*105,y:(row-Math.sqrt(n)/2)*106};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

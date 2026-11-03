import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Comet Stream: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutCometStream:StudioLayout={id:'comet-stream',label:'Comet Stream',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const j=i-(n-1)/2;const {x,y}={x:j*46,y:Math.sin(j*.25)*65+j*.43};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

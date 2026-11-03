import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Wave Corridor: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutWaveCorridor:StudioLayout={id:'wave-corridor',label:'Wave Corridor',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const t=i-(n-1)/2;const {x,y}={x:t*56,y:Math.sin(i*.55)*140+Math.cos(i*.18)*60};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

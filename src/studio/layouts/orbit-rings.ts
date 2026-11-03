import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Orbital Rings: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutOrbitRings:StudioLayout={id:'orbit-rings',label:'Orbital Rings',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const a=i*TAU/Math.max(1,n)+((fingerprint(tab.domain)%17)/70),r=125+Math.floor(i/Math.max(1,Math.ceil(n/4)))*115;const {x,y}={x:Math.cos(a)*r,y:Math.sin(a)*r*.8};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

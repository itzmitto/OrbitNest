import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Binary Orbits: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutBinaryOrbits:StudioLayout={id:'binary-orbits',label:'Binary Orbits',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const s=i%2,r=95+Math.floor(i/2)*24,a=i*2.3999;const {x,y}={x:(s?190:-190)+Math.cos(a)*r*.45,y:Math.sin(a)*r*.65};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

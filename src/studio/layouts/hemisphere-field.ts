import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Hemisphere Field: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutHemisphereField:StudioLayout={id:'hemisphere-field',label:'Hemisphere Field',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const a=i*2.3999632,r=130+Math.sqrt(i+1)*47;const {x,y}={x:Math.cos(a)*r,y:Math.abs(Math.sin(a)*r)-230};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

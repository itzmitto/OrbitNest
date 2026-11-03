import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Zodiac Wheel: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutZodiacWheel:StudioLayout={id:'zodiac-wheel',label:'Zodiac Wheel',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const group=i%12,layer=Math.floor(i/12),a=(group+.5)*TAU/12;const {x,y}={x:Math.cos(a)*(140+layer*85),y:Math.sin(a)*(140+layer*85)};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

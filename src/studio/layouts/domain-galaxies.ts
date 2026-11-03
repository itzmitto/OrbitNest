import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Domain Galaxies: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutDomainGalaxies:StudioLayout={id:'domain-galaxies',label:'Domain Galaxies',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const domains=[...new Set(tabs.map(t=>t.domain))].sort(),g=domains.indexOf(tab.domain),q=tabs.slice(0,i).filter(t=>t.domain===tab.domain).length,a=g*TAU/Math.max(1,domains.length),ra=220;const {x,y}={x:Math.cos(a)*ra+Math.cos(q*2.4)*Math.sqrt(q+1)*26,y:Math.sin(a)*ra+Math.sin(q*2.4)*Math.sqrt(q+1)*26};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

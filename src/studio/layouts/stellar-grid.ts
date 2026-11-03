import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Stellar Grid: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutStellarGrid:StudioLayout={id:'stellar-grid',label:'Stellar Grid',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const cols=Math.max(1,Math.ceil(Math.sqrt(n))),row=Math.floor(i/cols),col=i%cols;const {x,y}={x:(col-(cols-1)/2)*93,y:(row-(Math.ceil(n/cols)-1)/2)*93};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

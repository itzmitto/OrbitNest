import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Nebula Branches: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutNebulaBranches:StudioLayout={id:'nebula-branches',label:'Nebula Branches',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const branch=i%5,step=Math.floor(i/5),a=branch*TAU/5+Math.sin(step*.22)*.4,r=65+step*26;const {x,y}={x:Math.cos(a)*r,y:Math.sin(a)*r};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

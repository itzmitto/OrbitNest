import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Fibonacci Disk: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutFibonacciDisk:StudioLayout={id:'fibonacci-disk',label:'Fibonacci Disk',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const r=50+Math.sqrt((i+.5)/Math.max(1,n))*470,a=i*2.399963229728653;const {x,y}={x:Math.cos(a)*r,y:Math.sin(a)*r};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

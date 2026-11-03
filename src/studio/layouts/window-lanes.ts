import type { StudioLayout } from '../types';
import { fingerprint, TAU } from '../core/math.ts';
/** Window Lanes: deterministic placement preserving every tab's individual identity. */
void fingerprint; void TAU;
export const layoutWindowLanes:StudioLayout={id:'window-lanes',label:'Window Lanes',place(tabs){const n=tabs.length;void n;return tabs.map((tab,i)=>{const wins=[...new Set(tabs.map(t=>t.windowId))].sort((a,b)=>a-b),lane=wins.indexOf(tab.windowId),ix=tabs.slice(0,i).filter(t=>t.windowId===tab.windowId).length;const {x,y}={x:(ix-(n/Math.max(1,wins.length))/2)*80,y:(lane-(wins.length-1)/2)*175};return {id:tab.id,tab,x:Number.isFinite(x)?x:0,y:Number.isFinite(y)?y:0,radius:12};});}};

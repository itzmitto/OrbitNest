export const TAU = Math.PI*2;
export function fingerprint(input:string):number {let h=2166136261;for(const char of input)h=Math.imul(h^char.charCodeAt(0),16777619);return h>>>0;}
export function unit(seed:number):number {return (Math.imul(seed ^ (seed>>>13),1274126177)>>>0)/4294967296;}
export function nodeRadius(active:boolean,pinned:boolean,seed:number):number{return active?18:pinned?14:9+seed%6;}
export function clamp(value:number,min:number,max:number):number{return Number.isFinite(value)?Math.min(max,Math.max(min,value)):min;}

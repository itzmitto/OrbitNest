import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** A stream of worlds trailing the head of a comet. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitCometTail:OrbitPreset={
 id:'comet-tail',label:'Comet trail',description:'A stream of worlds trailing the head of a comet',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const t=i/n,a=i*.92+s*1.7;return {x:15*t-7.5,y:Math.sin(a)*(1+t*4),z:Math.cos(a)*(1+t*4)};
 }
};

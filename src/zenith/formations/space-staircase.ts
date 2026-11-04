import {TAU} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** A sequence of rotating spiral platforms. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitSpaceStaircase:OrbitPreset={
 id:'space-staircase',label:'Nebula staircase',description:'A sequence of rotating spiral platforms',
 place(index,count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count);
  const level=Math.floor(i/6),slot=i%6,a=slot*TAU/6+level*.42;return {x:Math.cos(a)*(3+level*.35),y:(level-Math.ceil(n/6)/2)*2,z:Math.sin(a)*(3+level*.35)};
 }
};

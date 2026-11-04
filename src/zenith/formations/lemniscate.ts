import {TAU,seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Interlocked looping orbits forming a figure eight. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitLemniscate:OrbitPreset={
 id:'lemniscate',label:'Infinity constellation',description:'Interlocked looping orbits forming a figure eight',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const t=i/n*TAU+s*.05,den=1+Math.cos(t)*Math.cos(t);return {x:9*Math.sin(t)/den,y:Math.sin(t*3)*.7,z:9*Math.sin(t)*Math.cos(t)/den};
 }
};

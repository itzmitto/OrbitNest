import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Concentric spiraling arms with progressive drift. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitLogarithmicSpiral:OrbitPreset={
 id:'logarithmic-spiral',label:'Logarithmic spiral',description:'Concentric spiraling arms with progressive drift',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const a=i*.87+s*.35,r=2+Math.exp(Math.min(2.3,i/n*2.3))*2.2;return {x:r*Math.cos(a),y:Math.sin(a*1.2)*1.1,z:r*Math.sin(a)};
 }
};

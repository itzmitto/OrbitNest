import {TAU,seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Layered elliptical rings above the equatorial plane. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitSaturnBelt:OrbitPreset={
 id:'saturn-belt',label:'Saturn asteroid belt',description:'Layered elliptical rings above the equatorial plane',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const layer=i%4,a=(Math.floor(i/4)/(Math.ceil(n/4)))*TAU+s*.1,r=3.3+layer*1.9;return {x:Math.cos(a)*r,y:(layer-1.5)*.4,z:Math.sin(a)*r*.66};
 }
};

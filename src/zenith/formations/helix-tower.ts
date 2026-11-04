import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Vertical bands that climb through space. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitHelixTower:OrbitPreset={
 id:'helix-tower',label:'Helical tower',description:'Vertical bands that climb through space',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const a=i*.94+s*.03;return {x:Math.cos(a)*5,y:(i-n/2)*.83,z:Math.sin(a)*5};
 }
};

import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Staggered inclined ellipses with orbital precession. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitKineticOrbits:OrbitPreset={
 id:'kinetic-orbits',label:'Kinetic orbits',description:'Staggered inclined ellipses with orbital precession',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const a=i*2.4+s*.04,r=4+(i%4)*1.25,tilt=(i%3-1)*.55;return {x:Math.cos(a)*r,y:Math.sin(a)*r*Math.sin(tilt),z:Math.sin(a)*r*Math.cos(tilt)};
 }
};

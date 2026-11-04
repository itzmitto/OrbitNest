import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Flat dusty planet disk with dense inner worlds. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitAccretionDisc:OrbitPreset={
 id:'accretion-disc',label:'Accretion disk',description:'Flat dusty planet disk with dense inner worlds',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const a=i*2.4+s*.4,r=1+7*Math.sqrt((i+.5)/n);return {x:r*Math.cos(a),y:(s-.5)*.42,z:r*Math.sin(a)};
 }
};

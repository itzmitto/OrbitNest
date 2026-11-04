import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Phyllotaxis with even spherical separation. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitGoldenRatio:OrbitPreset={
 id:'golden-ratio',label:'Golden ratio constellation',description:'Phyllotaxis with even spherical separation',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const a=i*2.39996323+s*.09,r=2+Math.sqrt(i+1)*1.25;return {x:Math.cos(a)*r,y:Math.sin(a*.31)*2.2,z:Math.sin(a)*r};
 }
};

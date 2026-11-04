import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Evenly spaced worlds on a hollow spherical shell. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitCelestialShell:OrbitPreset={
 id:'celestial-shell',label:'Celestial shell',description:'Evenly spaced worlds on a hollow spherical shell',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const y=1-2*(i+.5)/n,a=i*2.399+s*.05,r=Math.sqrt(Math.max(0,1-y*y));return {x:r*Math.cos(a)*8,y:y*8,z:r*Math.sin(a)*8};
 }
};

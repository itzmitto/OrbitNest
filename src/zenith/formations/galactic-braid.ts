import {TAU} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Three sinusoidal planet strands crossing space. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitGalacticBraid:OrbitPreset={
 id:'galactic-braid',label:'Galactic braid',description:'Three sinusoidal planet strands crossing space',
 place(index,count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count);
  const strand=i%3,t=Math.floor(i/3)/Math.ceil(n/3),phase=t*TAU*2.3+strand*TAU/3;return {x:(t-.5)*18,y:Math.sin(phase)*3,z:Math.cos(phase)*3};
 }
};

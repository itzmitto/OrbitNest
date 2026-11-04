import {TAU} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Diagonal streams of planets on parallel trajectories. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitMeteorStorm:OrbitPreset={
 id:'meteor-storm',label:'Meteor storm',description:'Diagonal streams of planets on parallel trajectories',
 place(index,count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count);
  const band=i%5,t=Math.floor(i/5)/Math.ceil(n/5);return {x:(t-.5)*18,y:(band-2)*2.3+Math.sin(t*TAU)*.5,z:(t-.5)*12+band};
 }
};

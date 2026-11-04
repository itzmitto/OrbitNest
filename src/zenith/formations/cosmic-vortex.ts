import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Tapering spiral funnel into a gravity well. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitCosmicVortex:OrbitPreset={
 id:'cosmic-vortex',label:'Cosmic vortex',description:'Tapering spiral funnel into a gravity well',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const t=i/n,a=i*.91+s*.15,r=1.3+8*t;return {x:Math.cos(a)*r,y:7*(1-t)**2-3,z:Math.sin(a)*r};
 }
};

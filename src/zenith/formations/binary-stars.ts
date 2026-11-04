import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Two orbital clusters around a binary center. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitBinaryStars:OrbitPreset={
 id:'binary-stars',label:'Twin star systems',description:'Two orbital clusters around a binary center',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const cluster=i%2,step=Math.floor(i/2),a=step*2.4+s*.2,r=1+Math.sqrt(step+1)*1.1;return {x:(cluster?5:-5)+Math.cos(a)*r,y:Math.sin(a*.7)*1.8,z:Math.sin(a)*r};
 }
};

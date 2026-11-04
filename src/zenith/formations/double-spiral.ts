import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Two opposing spirals around a bright common center. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitDoubleSpiral:OrbitPreset={
 id:'double-spiral',label:'Binary spiral arms',description:'Two opposing spirals around a bright common center',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const arm=i%2,step=Math.floor(i/2),a=step*.62+arm*Math.PI+s*.05,r=1.5+step*.83;return {x:Math.cos(a)*r,y:Math.sin(step*.45)*1.8,z:Math.sin(a)*r};
 }
};

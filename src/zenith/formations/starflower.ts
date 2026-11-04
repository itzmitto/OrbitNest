import {TAU} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Five bright radial petals around a star core. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitStarflower:OrbitPreset={
 id:'starflower',label:'Starflower',description:'Five bright radial petals around a star core',
 place(index,_count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index);
  const petal=i%5,layer=Math.floor(i/5),a=petal*TAU/5+layer*.09,r=2.1+layer*.95;return {x:Math.cos(a)*r,y:Math.sin(layer*.62)*1.4,z:Math.sin(a)*r};
 }
};

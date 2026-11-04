
import type {OrbitPreset} from '../core/types.ts';
/** A readable three-dimensional sector map. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitStellarGrid:OrbitPreset={
 id:'stellar-grid',label:'Stellar navigation grid',description:'A readable three-dimensional sector map',
 place(index,count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count);
  const side=Math.ceil(Math.cbrt(n)),x=i%side,y=Math.floor(i/side)%side,z=Math.floor(i/(side*side));return {x:(x-(side-1)/2)*2.7,y:(y-(side-1)/2)*2.7,z:(z-(side-1)/2)*2.7};
 }
};

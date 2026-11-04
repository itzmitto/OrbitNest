import {TAU,seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Small moons clustered around four anchor worlds. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitSatelliteSwarms:OrbitPreset={
 id:'satellite-swarms',label:'Satellite swarms',description:'Small moons clustered around four anchor worlds',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const group=i%4,k=Math.floor(i/4),a=k*2.399+s*.12,base=group*TAU/4,r=.8+Math.sqrt(k)*.65;return {x:Math.cos(base)*6+Math.cos(a)*r,y:Math.sin(k*.8)*1.3,z:Math.sin(base)*6+Math.sin(a)*r};
 }
};

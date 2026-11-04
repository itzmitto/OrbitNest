import {TAU,seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Vertical systems orbit a central light column. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitSolarPillars:OrbitPreset={
 id:'solar-pillars',label:'Solar pillars',description:'Vertical systems orbit a central light column',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const col=i%5,row=Math.floor(i/5),a=col*TAU/5+s*.1;return {x:Math.cos(a)*(3+row*.18),y:(row-Math.ceil(n/5)/2)*1.75,z:Math.sin(a)*(3+row*.18)};
 }
};

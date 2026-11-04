import {TAU} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Nested ribbons that rise around the poles. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitPolarRibbons:OrbitPreset={
 id:'polar-ribbons',label:'Polar aurora ribbons',description:'Nested ribbons that rise around the poles',
 place(index,count,_seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count);
  const band=i%3,t=Math.floor(i/3)/Math.ceil(n/3),a=t*TAU*2.2+band*TAU/3;return {x:Math.cos(a)*(3+band*1.5),y:Math.sin(t*TAU*1.4)*6,z:Math.sin(a)*(3+band*1.5)};
 }
};

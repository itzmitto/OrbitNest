import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** Half-sphere of orbiting domains. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitStellarDome:OrbitPreset={
 id:'stellar-dome',label:'Stellar dome',description:'Half-sphere of orbiting domains',
 place(index,count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),n=Math.max(1,count),s=seededRandom(seed);
  const t=(i+.5)/n,a=i*2.399+s*.1,latitude=Math.acos(1-t);return {x:Math.sin(latitude)*8*Math.cos(a),y:8*Math.cos(latitude),z:Math.sin(latitude)*8*Math.sin(a)};
 }
};

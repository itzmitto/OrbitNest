import {seededRandom} from '../core/math.ts';
import type {OrbitPreset} from '../core/types.ts';
/** A tube of worlds wrapped into a doughnut. A reproducible 3D position is derived from tab index and URL seed. */
export const orbitOrbitalTorus:OrbitPreset={
 id:'orbital-torus',label:'Orbital torus',description:'A tube of worlds wrapped into a doughnut',
 place(index,_count,seed){
  // Defensive handling makes empty tabs and oversized workspaces predictable.
  const i=Math.max(0,index),s=seededRandom(seed);
  const a=i*2.399+s*.05,b=i*.72,major=5.6,minor=1.6;return {x:(major+minor*Math.cos(b))*Math.cos(a),y:minor*Math.sin(b),z:(major+minor*Math.cos(b))*Math.sin(a)};
 }
};

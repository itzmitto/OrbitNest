import { layoutOrbitRings } from './orbit-rings.ts';
import type { StudioLayout,StudioTab } from '../types';
import { fingerprint,TAU } from '../core/math.ts';
void TAU;
export const layoutPresets:StudioLayout[]=[{id:'golden',label:'Golden Spiral',place:(tabs:StudioTab[])=>tabs.map((tab,i)=>{const a=i*2.39996+fingerprint(tab.domain)%13*.009,r=75+Math.sqrt(i)*63;return {id:tab.id,tab,x:Math.cos(a)*r,y:Math.sin(a)*r*.72,radius:12};})}];
layoutPresets.push(layoutOrbitRings);

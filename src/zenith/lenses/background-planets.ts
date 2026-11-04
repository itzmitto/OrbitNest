import type {TabLens} from '../core/types.ts';
/** Tabs not currently active. */
export const lensBackgroundPlanets:TabLens={
 id:'background-planets',label:'Background planets',description:'Tabs not currently active.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>!t.active);
 }
};

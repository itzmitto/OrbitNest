import type {TabLens} from '../core/types.ts';
/** Tabs currently silent. */
export const lensQuietPlanets:TabLens={
 id:'quiet-planets',label:'Quiet planets',description:'Tabs currently silent.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>!t.audible);
 }
};

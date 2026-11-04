import type {TabLens} from '../core/types.ts';
/** Tabs discarded by the browser. */
export const lensSleepingPlanets:TabLens={
 id:'sleeping-planets',label:'Sleeping planets',description:'Tabs discarded by the browser.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.discarded);
 }
};

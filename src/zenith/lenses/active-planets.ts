import type {TabLens} from '../core/types.ts';
/** Foreground tabs in their windows. */
export const lensActivePlanets:TabLens={
 id:'active-planets',label:'Active planets',description:'Foreground tabs in their windows.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.active);
 }
};

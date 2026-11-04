import type {TabLens} from '../core/types.ts';
/** Browser settings and new tab URLs. */
export const lensInternalPlanets:TabLens={
 id:'internal-planets',label:'Local planets',description:'Browser settings and new tab URLs.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>!/^https?:\/\//.test(t.url));
 }
};

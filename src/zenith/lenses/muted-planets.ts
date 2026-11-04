import type {TabLens} from '../core/types.ts';
/** Muted tabs including silent media worlds. */
export const lensMutedPlanets:TabLens={
 id:'muted-planets',label:'Muted planets',description:'Muted tabs including silent media worlds.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.muted);
 }
};

import type {TabLens} from '../core/types.ts';
/** Tabs currently making sound. */
export const lensAudioPlanets:TabLens={
 id:'audio-planets',label:'Sound planets',description:'Tabs currently making sound.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.audible);
 }
};

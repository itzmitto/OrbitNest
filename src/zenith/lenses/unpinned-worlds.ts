import type {TabLens} from '../core/types.ts';
/** Only unpinned, temporary browser tabs. */
export const lensUnpinnedWorlds:TabLens={
 id:'unpinned-worlds',label:'Floating worlds',description:'Only unpinned, temporary browser tabs.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>!t.pinned);
 }
};

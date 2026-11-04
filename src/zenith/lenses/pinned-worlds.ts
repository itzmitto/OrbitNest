import type {TabLens} from '../core/types.ts';
/** Only browser tabs deliberately pinned for later. */
export const lensPinnedWorlds:TabLens={
 id:'pinned-worlds',label:'Pinned worlds',description:'Only browser tabs deliberately pinned for later.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.pinned);
 }
};

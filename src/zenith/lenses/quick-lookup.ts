import type {TabLens} from '../core/types.ts';
/** Short page titles for fast searches. */
export const lensQuickLookup:TabLens={
 id:'quick-lookup',label:'Quick lookup planets',description:'Short page titles for fast searches.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.title.trim().length>0&&t.title.trim().length<=18);
 }
};

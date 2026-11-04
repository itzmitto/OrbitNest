import type {TabLens} from '../core/types.ts';
/** Tabs with long descriptive titles. */
export const lensLongReading:TabLens={
 id:'long-reading',label:'Reading planets',description:'Tabs with long descriptive titles.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.title.trim().length>=35);
 }
};

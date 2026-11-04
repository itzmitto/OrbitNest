import type {BrowserTab,Signal} from '../core/types.ts';
/** Additional browser tabs sharing the same URL */
function duplicateCount(tabs:BrowserTab[]):number{const seen=new Set<string>();let duplicates=0;
 for(const tab of tabs){if(seen.has(tab.url))duplicates++;else seen.add(tab.url);}return duplicates;}
export const signalDuplicateCount:Signal={
 id:'duplicate-count',label:'Duplicate orbits',description:'Additional browser tabs sharing the same URL',
 calculate(tabs){
  const value=duplicateCount(tabs);
  return {value,unit:'',detail:'Additional browser tabs sharing the same URL'};
 }
};

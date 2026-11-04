import type {BrowserTab,TabLens} from '../core/types.ts';
/** Additional tabs sharing an already-open URL. */
function findDuplicates(tabs:BrowserTab[]):Set<number>{
 const seen=new Set<string>(),duplicates=new Set<number>();
 for(const tab of tabs){if(seen.has(tab.url))duplicates.add(tab.id);else seen.add(tab.url);}
 return duplicates;
}
export const lensDuplicateWorlds:TabLens={
 id:'duplicate-worlds',label:'Duplicate worlds',description:'Additional tabs sharing an already-open URL.',
 select(tabs){
  const duplicates=findDuplicates(tabs);const copy=tabs.slice();
  return copy.filter(t=>duplicates.has(t.id));
 }
};

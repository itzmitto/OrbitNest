import type {BrowserTab,TabLens} from '../core/types.ts';
/** Tabs belonging to a non-primary window. */
function primaryWindow(tabs:BrowserTab[]):number{return tabs.find(t=>t.active)?.windowId??tabs[0]?.windowId??-1;}
export const lensMultiWindowWorlds:TabLens={
 id:'multi-window-worlds',label:'Multiverse worlds',description:'Tabs belonging to a non-primary window.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.windowId!==primaryWindow(tabs));
 }
};

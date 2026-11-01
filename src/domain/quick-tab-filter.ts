import type {TabRecord} from './tab';
export type QuickTabFilter='all'|'pinned'|'audible'|'active';
export function parseQuickTabFilter(value:unknown):QuickTabFilter {
  if(value==='pinned'||value==='audible'||value==='active')return value;
  return 'all';
}
export function filterByTabState(tabs:readonly TabRecord[],filter:QuickTabFilter):TabRecord[] {
  return tabs.filter(tab=>filter==='all'||(filter==='pinned'&&tab.pinned)||(filter==='audible'&&tab.audible)||(filter==='active'&&tab.active));
}

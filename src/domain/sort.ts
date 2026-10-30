import type { SortMode, TabRecord } from './tab';
export function sortTabs(tabs: TabRecord[], mode: SortMode): TabRecord[] {
  return [...tabs].sort((a,b)=> mode==='title' ? a.title.localeCompare(b.title) || a.id-b.id : mode==='domain' ? a.domain.localeCompare(b.domain)||a.id-b.id : a.windowId-b.windowId || a.index-b.index || a.id-b.id);
}

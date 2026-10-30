import type { TabRecord } from './tab';
export function duplicateTabIds(tabs: TabRecord[]): Set<number> {
  const buckets=new Map<string,number[]>();
  for(const tab of tabs){if(!tab.url||!/^https?:\/\//.test(tab.url))continue;const key=tab.url.split('#')[0];buckets.set(key,[...(buckets.get(key)??[]),tab.id]);}
  return new Set([...buckets.values()].filter(ids=>ids.length>1).flat());
}

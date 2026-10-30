import type { TabRecord } from './tab';
export function searchTabs(tabs: TabRecord[], query: string): TabRecord[] {
  const terms = query.normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return tabs;
  return tabs.filter((tab) => terms.every((term) => `${tab.title} ${tab.domain} ${tab.url ?? ''}`.toLocaleLowerCase().includes(term)));
}

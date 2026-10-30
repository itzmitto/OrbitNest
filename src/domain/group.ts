import type { GroupMode, TabGroup, TabRecord } from './tab';
export function groupTabs(tabs: TabRecord[], mode: GroupMode): TabGroup[] {
  if (mode === 'none') return [{ key: 'all', name: 'All tabs', tabs }];
  const groups = new Map<string, TabGroup>();
  for (const tab of tabs) {
    const key = mode === 'window' ? String(tab.windowId) : tab.domain;
    const name = mode === 'window' ? `Window ${tab.windowId}` : tab.domain;
    if (!groups.has(key)) groups.set(key, { key, name, tabs: [] });
    groups.get(key)!.tabs.push(tab);
  }
  return [...groups.values()];
}

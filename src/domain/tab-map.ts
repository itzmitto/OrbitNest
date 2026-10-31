import type { TabRecord } from './tab';

/** Export a privacy-minimal snapshot: title and domain, not URL or page content. */
export function makeTabMap(tabs: readonly TabRecord[]): string {
  const windows = new Map<number, TabRecord[]>();
  for (const tab of tabs) {
    if (!windows.has(tab.windowId)) windows.set(tab.windowId, []);
    windows.get(tab.windowId)!.push(tab);
  }
  const lines = ['# OrbitNest tab map', '', `${tabs.length} planets across ${windows.size} windows`, ''];
  for (const [windowId, items] of [...windows].sort(([a], [b]) => a - b)) {
    lines.push(`## Window ${windowId}`, '');
    for (const tab of [...items].sort((a, b) => a.index - b.index)) {
      const safeTitle = tab.title.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
      const safeDomain = tab.domain.replace(/[\r\n\t]+/g, ' ').slice(0, 100);
      lines.push(`- ${tab.active ? '[active] ' : ''}${safeTitle || 'Untitled tab'} (${safeDomain || 'Unknown domain'})`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

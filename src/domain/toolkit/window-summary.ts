import type { TabRecord } from '../tab';
export function windowSummary(tabs: readonly TabRecord[]): { windowId: number; total: number; active: number; pinned: number }[] {
  const byId = new Map<number, { windowId: number; total: number; active: number; pinned: number }>();
  for (const tab of tabs) {
    const row = byId.get(tab.windowId) ?? { windowId: tab.windowId, total: 0, active: 0, pinned: 0 };
    row.total++; if (tab.active) row.active++; if (tab.pinned) row.pinned++;
    byId.set(tab.windowId, row);
  }
  return [...byId.values()].sort((a, b) => a.windowId - b.windowId);
}

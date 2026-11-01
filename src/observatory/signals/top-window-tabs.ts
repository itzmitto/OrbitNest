import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Number of tabs in the busiest browser window. No network requests or raw URLs. */
export function observeTopWindowTabs(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = t.windowId;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = Math.max(0,...groups.values());
  const value = formatCount(number);
  return { id: 'top-window-tabs', label: 'Busiest window', category: 'Organization', value, detail: 'Number of tabs in the busiest browser window.' };
}

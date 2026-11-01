import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs held in the busiest browser window. No network requests or raw URLs. */
export function observeMaxWindowPressure(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = t.windowId;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = tabs.length ? Math.max(0,...groups.values()) / tabs.length * 100 : 0;
  const value = formatPercent(number);
  return { id: 'max-window-pressure', label: 'Window pressure', category: 'Activity', value, detail: 'Share of tabs held in the busiest browser window.' };
}

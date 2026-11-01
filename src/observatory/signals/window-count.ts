import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Number of distinct browser windows. No network requests or raw URLs. */
export function observeWindowCount(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = t.windowId;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = groups.size;
  const value = formatCount(number);
  return { id: 'window-count', label: 'Browser windows', category: 'Organization', value, detail: 'Number of distinct browser windows.' };
}

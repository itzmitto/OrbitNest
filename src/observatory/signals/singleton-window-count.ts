import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Windows with only one open tab. No network requests or raw URLs. */
export function observeSingletonWindowCount(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = t.windowId;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = [...groups.values()].filter(n => n === 1).length;
  const value = formatCount(number);
  return { id: 'singleton-window-count', label: 'Single-tab windows', category: 'Organization', value, detail: 'Windows with only one open tab.' };
}

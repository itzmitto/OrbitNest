import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs currently focused in their browser windows. No network requests or raw URLs. */
export function observeActiveWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.active).length;
  const value = formatCount(number);
  return { id: 'active-world-count', label: 'Active worlds', category: 'Activity', value, detail: 'Tabs currently focused in their browser windows.' };
}

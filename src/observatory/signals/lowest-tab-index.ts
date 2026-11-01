import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Smallest tab position in a browser window. No network requests or raw URLs. */
export function observeLowestTabIndex(tabs: readonly TabRecord[]): Observation {
  const number = tabs.length ? Math.min(...tabs.map(t => t.index)) : 0;
  const value = formatCount(number);
  return { id: 'lowest-tab-index', label: 'First tab index', category: 'Navigation', value, detail: 'Smallest tab position in a browser window.' };
}

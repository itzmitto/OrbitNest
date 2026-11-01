import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Largest tab position in a browser window. No network requests or raw URLs. */
export function observeHighestTabIndex(tabs: readonly TabRecord[]): Observation {
  const number = Math.max(0,...tabs.map(t => t.index));
  const value = formatCount(number);
  return { id: 'highest-tab-index', label: 'Last tab index', category: 'Navigation', value, detail: 'Largest tab position in a browser window.' };
}

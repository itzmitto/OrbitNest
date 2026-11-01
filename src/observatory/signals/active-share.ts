import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs active in their windows. No network requests or raw URLs. */
export function observeActiveShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.active).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'active-share', label: 'Focused share', category: 'Activity', value, detail: 'Share of tabs active in their windows.' };
}

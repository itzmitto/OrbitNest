import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs not currently focused. No network requests or raw URLs. */
export function observeBackgroundShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.active).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'background-share', label: 'Background share', category: 'Activity', value, detail: 'Share of tabs not currently focused.' };
}

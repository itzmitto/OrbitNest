import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs pinned. No network requests or raw URLs. */
export function observePinnedShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.pinned).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'pinned-share', label: 'Pinned share', category: 'Organization', value, detail: 'Share of tabs pinned.' };
}

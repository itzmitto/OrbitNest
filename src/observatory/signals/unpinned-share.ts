import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of unpinned tabs. No network requests or raw URLs. */
export function observeUnpinnedShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.pinned).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'unpinned-share', label: 'Unpinned share', category: 'Organization', value, detail: 'Share of unpinned tabs.' };
}

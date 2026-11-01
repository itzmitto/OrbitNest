import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs muted. No network requests or raw URLs. */
export function observeMutedShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.muted).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'muted-share', label: 'Muted share', category: 'Audio', value, detail: 'Share of tabs muted.' };
}

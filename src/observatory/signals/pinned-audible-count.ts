import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Pinned tabs that play sound. No network requests or raw URLs. */
export function observePinnedAudibleCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.pinned && t.audible).length;
  const value = formatCount(number);
  return { id: 'pinned-audible-count', label: 'Pinned audio', category: 'Audio', value, detail: 'Pinned tabs that play sound.' };
}

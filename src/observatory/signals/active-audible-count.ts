import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Focused tabs that play audio. No network requests or raw URLs. */
export function observeActiveAudibleCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.active && t.audible).length;
  const value = formatCount(number);
  return { id: 'active-audible-count', label: 'Active audio', category: 'Audio', value, detail: 'Focused tabs that play audio.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs currently playing sound. No network requests or raw URLs. */
export function observeAudibleWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.audible).length;
  const value = formatCount(number);
  return { id: 'audible-world-count', label: 'Sound sources', category: 'Audio', value, detail: 'Tabs currently playing sound.' };
}

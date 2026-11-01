import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Minimum title length in characters. No network requests or raw URLs. */
export function observeShortestTitleLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.title.length);
  const number = lengths.length ? Math.min(...lengths) : 0;
  const value = formatCount(number);
  return { id: 'shortest-title-length', label: 'Shortest title', category: 'Accessibility', value, detail: 'Minimum title length in characters.' };
}

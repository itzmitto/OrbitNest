import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Maximum title length in characters. No network requests or raw URLs. */
export function observeLongestTitleLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.title.length);
  const number = Math.max(0,...lengths);
  const value = formatCount(number);
  return { id: 'longest-title-length', label: 'Longest title', category: 'Accessibility', value, detail: 'Maximum title length in characters.' };
}

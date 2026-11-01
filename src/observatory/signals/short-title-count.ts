import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tab titles with fewer than 18 characters. No network requests or raw URLs. */
export function observeShortTitleCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.title.length < 18).length;
  const value = formatCount(number);
  return { id: 'short-title-count', label: 'Short labels', category: 'Accessibility', value, detail: 'Tab titles with fewer than 18 characters.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tab titles longer than 70 characters. No network requests or raw URLs. */
export function observeLongTitleCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.title.length > 70).length;
  const value = formatCount(number);
  return { id: 'long-title-count', label: 'Long names', category: 'Accessibility', value, detail: 'Tab titles longer than 70 characters.' };
}

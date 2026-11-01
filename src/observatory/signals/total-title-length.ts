import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Total length of the current page titles. No network requests or raw URLs. */
export function observeTotalTitleLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.title.length);
  const number = lengths.reduce((a,b)=>a+b,0);
  const value = formatCount(number);
  return { id: 'total-title-length', label: 'Title footprint', category: 'Accessibility', value, detail: 'Total length of the current page titles.' };
}

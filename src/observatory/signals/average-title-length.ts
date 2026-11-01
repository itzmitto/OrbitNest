import type { TabRecord } from '../../domain/tab';
import { type Observation } from '../types.ts';
/** Average visible page-title length. No network requests or raw URLs. */
export function observeAverageTitleLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.title.length);
  const number = lengths.length ? lengths.reduce((a,b)=>a+b,0)/lengths.length : 0;
  const value = String(Number(number.toFixed(1)));
  return { id: 'average-title-length', label: 'Average title length', category: 'Accessibility', value, detail: 'Average visible page-title length.' };
}

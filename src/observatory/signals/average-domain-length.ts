import type { TabRecord } from '../../domain/tab';
import { type Observation } from '../types.ts';
/** Average domain label width in characters. No network requests or raw URLs. */
export function observeAverageDomainLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.domain.length);
  const number = lengths.length ? lengths.reduce((a,b)=>a+b,0)/lengths.length : 0;
  const value = String(Number(number.toFixed(1)));
  return { id: 'average-domain-length', label: 'Average domain length', category: 'Visuals', value, detail: 'Average domain label width in characters.' };
}

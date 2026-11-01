import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Total length of domain labels in characters. No network requests or raw URLs. */
export function observeTotalDomainLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.domain.length);
  const number = lengths.reduce((a,b)=>a+b,0);
  const value = formatCount(number);
  return { id: 'total-domain-length', label: 'Domain footprint', category: 'Visuals', value, detail: 'Total length of domain labels in characters.' };
}

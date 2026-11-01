import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Shortest domain label in characters. No network requests or raw URLs. */
export function observeShortestDomainLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.domain.length);
  const number = lengths.length ? Math.min(...lengths) : 0;
  const value = formatCount(number);
  return { id: 'shortest-domain-length', label: 'Shortest domain', category: 'Visuals', value, detail: 'Shortest domain label in characters.' };
}

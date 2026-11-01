import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Longest domain label in characters. No network requests or raw URLs. */
export function observeLongestDomainLength(tabs: readonly TabRecord[]): Observation {
  const lengths = tabs.map(t => t.domain.length);
  const number = Math.max(0,...lengths);
  const value = formatCount(number);
  return { id: 'longest-domain-length', label: 'Longest domain', category: 'Visuals', value, detail: 'Longest domain label in characters.' };
}

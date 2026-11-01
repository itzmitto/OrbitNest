import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Excess copies of a domain in the busiest group. No network requests or raw URLs. */
export function observeMaxDomainDuplicates(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = Math.max(0,Math.max(0,...groups.values()) - 1);
  const value = formatCount(number);
  return { id: 'max-domain-duplicates', label: 'Maximum repetition', category: 'Organization', value, detail: 'Excess copies of a domain in the busiest group.' };
}

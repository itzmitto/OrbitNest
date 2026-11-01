import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Domains with more than one open tab. No network requests or raw URLs. */
export function observeRepeatedDomainCount(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = [...groups.values()].filter(n => n > 1).length;
  const value = formatCount(number);
  return { id: 'repeated-domain-count', label: 'Repeat destinations', category: 'Organization', value, detail: 'Domains with more than one open tab.' };
}

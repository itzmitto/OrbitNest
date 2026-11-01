import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Domains represented by exactly one tab. No network requests or raw URLs. */
export function observeSingletonDomainCount(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = [...groups.values()].filter(n => n === 1).length;
  const value = formatCount(number);
  return { id: 'singleton-domain-count', label: 'Solo destinations', category: 'Organization', value, detail: 'Domains represented by exactly one tab.' };
}

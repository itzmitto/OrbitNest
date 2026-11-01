import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Number of distinct domain labels. No network requests or raw URLs. */
export function observeDomainCount(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = groups.size;
  const value = formatCount(number);
  return { id: 'domain-count', label: 'Distinct domains', category: 'Organization', value, detail: 'Number of distinct domain labels.' };
}

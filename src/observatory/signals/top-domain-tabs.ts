import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Number of tabs at the most common domain. No network requests or raw URLs. */
export function observeTopDomainTabs(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = Math.max(0,...groups.values());
  const value = formatCount(number);
  return { id: 'top-domain-tabs', label: 'Largest destination', category: 'Organization', value, detail: 'Number of tabs at the most common domain.' };
}

import type { TabRecord } from '../../domain/tab';
import { type Observation } from '../types.ts';
/** Average number of tabs per destination. No network requests or raw URLs. */
export function observeAverageDomainLoad(tabs: readonly TabRecord[]): Observation {
  const groups = new Map<string | number,number>();
  for (const t of tabs) {
    const key = (t.domain || "Unknown");
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  const number = groups.size ? tabs.length / groups.size : 0;
  const value = String(Number(number.toFixed(1)));
  return { id: 'average-domain-load', label: 'Tabs per domain', category: 'Activity', value, detail: 'Average number of tabs per destination.' };
}

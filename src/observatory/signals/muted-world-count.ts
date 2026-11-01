import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs with sound suppressed. No network requests or raw URLs. */
export function observeMutedWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.muted).length;
  const value = formatCount(number);
  return { id: 'muted-world-count', label: 'Muted worlds', category: 'Audio', value, detail: 'Tabs with sound suppressed.' };
}

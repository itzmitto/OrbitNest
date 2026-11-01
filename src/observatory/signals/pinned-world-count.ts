import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs you chose to keep in place. No network requests or raw URLs. */
export function observePinnedWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.pinned).length;
  const value = formatCount(number);
  return { id: 'pinned-world-count', label: 'Pinned worlds', category: 'Organization', value, detail: 'Tabs you chose to keep in place.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Unpinned browser tabs. No network requests or raw URLs. */
export function observeUnpinnedWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.pinned).length;
  const value = formatCount(number);
  return { id: 'unpinned-world-count', label: 'Free-moving tabs', category: 'Organization', value, detail: 'Unpinned browser tabs.' };
}

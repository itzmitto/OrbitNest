import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs not active in their browser window. No network requests or raw URLs. */
export function observeUnfocusedWorldCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.active).length;
  const value = formatCount(number);
  return { id: 'unfocused-world-count', label: 'Background worlds', category: 'Activity', value, detail: 'Tabs not active in their browser window.' };
}

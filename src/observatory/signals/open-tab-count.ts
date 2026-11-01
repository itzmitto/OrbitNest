import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** All currently visible browser tabs. No network requests or raw URLs. */
export function observeOpenTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter(() => true).length;
  const value = formatCount(number);
  return { id: 'open-tab-count', label: 'Open worlds', category: 'Tabs', value, detail: 'All currently visible browser tabs.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs positioned after the first tab in their window. No network requests or raw URLs. */
export function observeNoninitialTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter(t=>t.index>0).length;
  const value = formatCount(number);
  return { id: 'noninitial-tab-count', label: 'Beyond first position', category: 'Navigation', value, detail: 'Tabs positioned after the first tab in their window.' };
}

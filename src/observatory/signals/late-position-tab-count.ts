import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs positioned 10th or later in their window. No network requests or raw URLs. */
export function observeLatePositionTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter(t=>t.index>=9).length;
  const value = formatCount(number);
  return { id: 'late-position-tab-count', label: 'Deep tab positions', category: 'Navigation', value, detail: 'Tabs positioned 10th or later in their window.' };
}

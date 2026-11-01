import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs positioned first in their window. No network requests or raw URLs. */
export function observeFirstPositionTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter(t=>t.index===0).length;
  const value = formatCount(number);
  return { id: 'first-position-tab-count', label: 'First-position tabs', category: 'Navigation', value, detail: 'Tabs positioned first in their window.' };
}

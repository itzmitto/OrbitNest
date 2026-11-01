import type { TabRecord } from '../../domain/tab';
import { type Observation } from '../types.ts';
/** Average tab position across open windows. No network requests or raw URLs. */
export function observeAverageTabIndex(tabs: readonly TabRecord[]): Observation {
  const number = tabs.length ? tabs.reduce((a,t) => a+t.index,0)/tabs.length : 0;
  const value = String(Number(number.toFixed(1)));
  return { id: 'average-tab-index', label: 'Average tab position', category: 'Navigation', value, detail: 'Average tab position across open windows.' };
}

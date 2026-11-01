import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs without a website favicon. No network requests or raw URLs. */
export function observeFaviconMissingCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.favIconUrl).length;
  const value = formatCount(number);
  return { id: 'favicon-missing-count', label: 'Fallback icons', category: 'Visuals', value, detail: 'Tabs without a website favicon.' };
}

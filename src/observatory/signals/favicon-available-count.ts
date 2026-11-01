import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs with a website favicon. No network requests or raw URLs. */
export function observeFaviconAvailableCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => Boolean(t.favIconUrl)).length;
  const value = formatCount(number);
  return { id: 'favicon-available-count', label: 'Recognizable worlds', category: 'Visuals', value, detail: 'Tabs with a website favicon.' };
}

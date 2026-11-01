import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs without an informative title. No network requests or raw URLs. */
export function observeUntitledTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.title.trim().length === 0).length;
  const value = formatCount(number);
  return { id: 'untitled-tab-count', label: 'Unnamed worlds', category: 'Accessibility', value, detail: 'Tabs without an informative title.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs with a local development host. No network requests or raw URLs. */
export function observeLocalhostTabCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(t.domain)).length;
  const value = formatCount(number);
  return { id: 'localhost-tab-count', label: 'Local projects', category: 'Development', value, detail: 'Tabs with a local development host.' };
}

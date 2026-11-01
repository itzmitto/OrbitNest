import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of local development pages. No network requests or raw URLs. */
export function observeLocalShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(t.domain)).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'local-share', label: 'Localhost share', category: 'Development', value, detail: 'Share of local development pages.' };
}

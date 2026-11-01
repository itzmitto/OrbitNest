import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of browser-internal or non-web tabs. No network requests or raw URLs. */
export function observeSpecialShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !/^https?:\/\//.test(t.url ?? "")).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'special-share', label: 'Special-page share', category: 'Security', value, detail: 'Share of browser-internal or non-web tabs.' };
}

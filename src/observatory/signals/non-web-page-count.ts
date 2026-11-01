import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Pages without an HTTP or HTTPS URL. No network requests or raw URLs. */
export function observeNonWebPageCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !/^https?:\/\//.test(t.url ?? "")).length;
  const value = formatCount(number);
  return { id: 'non-web-page-count', label: 'Special pages', category: 'Security', value, detail: 'Pages without an HTTP or HTTPS URL.' };
}

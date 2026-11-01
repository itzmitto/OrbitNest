import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs with an HTTP address. No network requests or raw URLs. */
export function observeInsecurePageCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.url?.startsWith("http://") ?? false).length;
  const value = formatCount(number);
  return { id: 'insecure-page-count', label: 'Unencrypted pages', category: 'Security', value, detail: 'Tabs with an HTTP address.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs with an HTTPS address. No network requests or raw URLs. */
export function observeSecurePageCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.url?.startsWith("https://") ?? false).length;
  const value = formatCount(number);
  return { id: 'secure-page-count', label: 'Secure pages', category: 'Security', value, detail: 'Tabs with an HTTPS address.' };
}

import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs served over HTTPS. No network requests or raw URLs. */
export function observeSecureShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.url?.startsWith("https://") ?? false).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'secure-share', label: 'HTTPS coverage', category: 'Security', value, detail: 'Share of tabs served over HTTPS.' };
}

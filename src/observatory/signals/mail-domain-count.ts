import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs on commonly used webmail providers. No network requests or raw URLs. */
export function observeMailDomainCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /(^|\.)(gmail\.com|outlook\.live\.com|mail\.google\.com)$/.test(t.domain)).length;
  const value = formatCount(number);
  return { id: 'mail-domain-count', label: 'Inbox worlds', category: 'Organization', value, detail: 'Tabs on commonly used webmail providers.' };
}

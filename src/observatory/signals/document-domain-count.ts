import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs that look like reference documentation. No network requests or raw URLs. */
export function observeDocumentDomainCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /(^docs?\.|\.docs\.|developer\.)/.test(t.domain)).length;
  const value = formatCount(number);
  return { id: 'document-domain-count', label: 'Documentation worlds', category: 'Development', value, detail: 'Tabs that look like reference documentation.' };
}

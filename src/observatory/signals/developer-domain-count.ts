import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs open on GitHub, GitLab or Stack Overflow. No network requests or raw URLs. */
export function observeDeveloperDomainCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /(^|\.)(github\.com|gitlab\.com|stackoverflow\.com)$/.test(t.domain)).length;
  const value = formatCount(number);
  return { id: 'developer-domain-count', label: 'Developer destinations', category: 'Development', value, detail: 'Tabs open on GitHub, GitLab or Stack Overflow.' };
}

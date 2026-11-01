import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Tabs on common video and music platforms. No network requests or raw URLs. */
export function observeMediaDomainCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => /(^|\.)(youtube\.com|spotify\.com|twitch\.tv)$/.test(t.domain)).length;
  const value = formatCount(number);
  return { id: 'media-domain-count', label: 'Media worlds', category: 'Activity', value, detail: 'Tabs on common video and music platforms.' };
}

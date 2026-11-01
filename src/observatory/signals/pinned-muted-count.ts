import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Pinned tabs with muted audio. No network requests or raw URLs. */
export function observePinnedMutedCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.pinned && t.muted).length;
  const value = formatCount(number);
  return { id: 'pinned-muted-count', label: 'Pinned and muted', category: 'Organization', value, detail: 'Pinned tabs with muted audio.' };
}

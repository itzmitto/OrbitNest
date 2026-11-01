import type { TabRecord } from '../../domain/tab';
import { formatCount, type Observation } from '../types.ts';
/** Unfocused tabs that are muted. No network requests or raw URLs. */
export function observeInactiveMutedCount(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => !t.active && t.muted).length;
  const value = formatCount(number);
  return { id: 'inactive-muted-count', label: 'Silent background', category: 'Audio', value, detail: 'Unfocused tabs that are muted.' };
}

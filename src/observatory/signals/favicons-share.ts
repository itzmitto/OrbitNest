import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs with recognizable favicons. No network requests or raw URLs. */
export function observeFaviconsShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => Boolean(t.favIconUrl)).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'favicons-share', label: 'Favicon coverage', category: 'Visuals', value, detail: 'Share of tabs with recognizable favicons.' };
}

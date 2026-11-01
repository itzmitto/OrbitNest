import type { TabRecord } from '../../domain/tab';
import { formatPercent, type Observation } from '../types.ts';
/** Share of tabs playing audio. No network requests or raw URLs. */
export function observeAudioShare(tabs: readonly TabRecord[]): Observation {
  const number = tabs.filter((t) => t.audible).length;
  const value = formatPercent(tabs.length ? (number / tabs.length) * 100 : 0);
  return { id: 'audio-share', label: 'Audio share', category: 'Audio', value, detail: 'Share of tabs playing audio.' };
}

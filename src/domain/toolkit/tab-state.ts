import type { TabRecord } from '../tab';
export type TabState = 'active' | 'audible' | 'muted' | 'pinned' | 'idle';
/** Choose a stable status for a tab card without reading its webpage. */
export function tabState(tab: Pick<TabRecord, 'active' | 'audible' | 'muted' | 'pinned'>): TabState {
  if (tab.active) return 'active';
  if (tab.muted) return 'muted';
  if (tab.audible) return 'audible';
  if (tab.pinned) return 'pinned';
  return 'idle';
}

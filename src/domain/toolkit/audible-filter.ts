import type { TabRecord } from '../tab';
export function playingTabs<T extends Pick<TabRecord,'audible'|'muted'>>(tabs: readonly T[]): T[] {
  return tabs.filter(tab => tab.audible && !tab.muted);
}

import type { TabRecord } from '../tab';
export function pinnedFirst<T extends Pick<TabRecord, 'pinned' | 'index'>>(tabs: readonly T[]): T[] {
  return [...tabs].sort((a,b) => Number(b.pinned)-Number(a.pinned) || a.index-b.index);
}

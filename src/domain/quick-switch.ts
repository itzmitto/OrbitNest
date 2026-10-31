import type { TabRecord } from './tab';
/** Pure ranking for local-only, keyboard-first tab switching. */
export function quickSwitchResults(tabs: readonly TabRecord[], query: string, limit = 8): TabRecord[] {
  const term = query.trim().toLowerCase();
  const score = (tab: TabRecord) => {
    if (!term) return tab.active ? 6 : tab.pinned ? 4 : 1;
    const title = tab.title.toLowerCase(), domain = tab.domain.toLowerCase();
    if (domain === term || title === term) return 10;
    if (title.startsWith(term) || domain.startsWith(term)) return 7;
    if (title.includes(term) || domain.includes(term)) return 3;
    return 0;
  };
  return tabs.map((tab, index) => ({tab,index,score:score(tab)}))
    .filter(item=>item.score>0)
    .sort((a,b)=>b.score-a.score || a.index-b.index)
    .slice(0,Math.max(0,Math.floor(limit)))
    .map(item=>item.tab);
}

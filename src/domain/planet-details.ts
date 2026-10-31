import type { TabRecord } from './tab';
export type PlanetDetails = { title: string; domain: string; state: string; windowLabel: string };
export function describePlanetTab(tab: TabRecord): PlanetDetails {
  return {
    title: tab.title.trim() || tab.domain || 'Untitled tab',
    domain: tab.domain || 'Unknown page',
    state: [tab.active ? 'Active' : 'Open', tab.pinned ? 'Pinned' : null, tab.muted ? 'Muted' : null].filter(Boolean).join(' · '),
    windowLabel: `Window ${tab.windowId}`,
  };
}

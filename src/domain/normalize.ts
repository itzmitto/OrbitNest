import type { TabRecord } from './tab';
export type BrowserTab = { id?: number; windowId: number; title?: string; url?: string; pendingUrl?: string; favIconUrl?: string; active: boolean; pinned: boolean; mutedInfo?: { muted: boolean }; audible?: boolean; index: number; incognito?: boolean };
export function extractDomain(url: string | undefined): string {
  if (!url) return 'Unknown page';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.hostname.replace(/^www\./, '').toLowerCase();
    return `${parsed.protocol.replace(':', '')} page`;
  } catch { return 'Unknown page'; }
}
export function normalizeTab(tab: BrowserTab): TabRecord | null {
  if (typeof tab.id !== 'number' || tab.incognito) return null;
  const url = tab.url ?? tab.pendingUrl ?? null;
  return { id: tab.id, windowId: tab.windowId, title: tab.title?.trim() || extractDomain(url ?? undefined), url,
    domain: extractDomain(url ?? undefined), favIconUrl: tab.favIconUrl || null, active: tab.active, pinned: tab.pinned,
    muted: Boolean(tab.mutedInfo?.muted), audible: Boolean(tab.audible), index: tab.index };
}
export function normalizeTabs(tabs: BrowserTab[]): TabRecord[] {
  return tabs.map(normalizeTab).filter((tab): tab is TabRecord => tab !== null);
}

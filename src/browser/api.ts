import type { BrowserTab } from '../domain/normalize';
export function hasBrowserTabs(): boolean { return typeof chrome !== 'undefined' && Boolean(chrome.tabs?.query); }
export async function queryBrowserTabs(): Promise<BrowserTab[]> {
  if (!hasBrowserTabs()) return [];
  const tabs = await chrome.tabs.query({});
  return tabs.map((tab) => ({
    id: tab.id, windowId: tab.windowId, title: tab.title, url: tab.url, pendingUrl: tab.pendingUrl,
    favIconUrl: tab.favIconUrl, active: tab.active, pinned: tab.pinned,
    mutedInfo: tab.mutedInfo, audible: tab.audible, index: tab.index, incognito: tab.incognito,
  }));
}

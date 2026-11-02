import { normalizeTabs, type TabInfo } from './model';
type ChromeTabApi = { query(query: Record<string, never>): Promise<Array<Record<string, unknown>>>;
  update(id: number, opts: {active: boolean}): Promise<unknown> };
type ChromeWindowApi = { update(id: number, opts: {focused: boolean}): Promise<unknown> };
type ChromeShim = { tabs: ChromeTabApi; windows: ChromeWindowApi };
export function chromeApi(): ChromeShim | null {
  const possible = (globalThis as unknown as {chrome?: ChromeShim}).chrome;
  if (!possible) return null;
  return typeof possible.tabs.query === 'function' && typeof possible.windows.update === 'function' ? possible : null;
}
export const demoTabs: TabInfo[] = [
  {id:1,windowId:1,title:'GitHub · Your projects',domain:'github.com',url:'https://github.com',active:true,pinned:true,audible:false,muted:false,discarded:false,loading:false},
  {id:2,windowId:1,title:'Developer documentation',domain:'developer.chrome.com',url:'https://developer.chrome.com',active:false,pinned:false,audible:false,muted:false,discarded:false,loading:false},
  {id:3,windowId:1,title:'Visual references',domain:'unsplash.com',url:'https://unsplash.com',active:false,pinned:false,audible:false,muted:false,discarded:false,loading:false},
  {id:4,windowId:2,title:'Music player',domain:'youtube.com',url:'https://youtube.com',active:false,pinned:false,audible:true,muted:false,discarded:false,loading:false},
  {id:5,windowId:2,title:'Work tasks',domain:'github.com',url:'https://github.com/issues',active:false,pinned:false,audible:false,muted:false,discarded:false,loading:false},
];
export async function loadTabs(): Promise<{tabs: TabInfo[]; isDemo: boolean}> {
  const api = chromeApi(); if (!api) return { tabs: demoTabs, isDemo: true };
  try { return { tabs: normalizeTabs(await api.tabs.query({})), isDemo: false }; }
  catch { return { tabs: [], isDemo: false }; }
}
export async function activateTab(tab: TabInfo) {
  const api = chromeApi(); if (!api) return;
  await api.windows.update(tab.windowId, {focused:true}); await api.tabs.update(tab.id,{active:true});
}

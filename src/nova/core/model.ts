import type {BrowserTab} from '../../zenith/core/types.ts';

export type NovaTab = BrowserTab;
export interface DomainWorld { host: string; count: number; tabs: NovaTab[]; hue: number }
export interface NovaStats { total: number; windows: number; domains: number; pinned: number; audible: number; duplicates: number }
export interface PanelContext {
  tabs: NovaTab[];
  refresh(): void;
  go(page: string): void;
  notify(message: string): void;
  open(id: number): Promise<boolean>;
}
export interface NovaPanel {
  id: string;
  title: string;
  description: string;
  render(host: HTMLElement, context: PanelContext): void | (() => void);
}
export function domainOf(url: string): string {
  try {
    const address = new URL(url);
    return address.protocol === 'http:' || address.protocol === 'https:'
      ? address.hostname.replace(/^www\./, '').toLowerCase() : 'Browser pages';
  } catch { return 'Unknown'; }
}
export function canonicalUrl(url: string): string {
  try {
    const value = new URL(url);
    if (!['https:', 'http:'].includes(value.protocol)) return url;
    value.hash = '';
    value.hostname = value.hostname.toLowerCase();
    if (value.pathname.length > 1) value.pathname = value.pathname.replace(/\/$/, '');
    return value.href;
  } catch { return url; }
}
export function wordHue(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0) % 360;
}
export function clusterTabs(tabs: NovaTab[]): DomainWorld[] {
  const domains = new Map<string, NovaTab[]>();
  for (const tab of tabs) {
    const domain = domainOf(tab.url);
    domains.set(domain, [...(domains.get(domain) || []), tab]);
  }
  return [...domains].map(([host, group]) => ({host, count: group.length, tabs: group, hue: wordHue(host)}))
    .sort((left, right) => right.count - left.count || left.host.localeCompare(right.host));
}
export function tabStats(tabs: NovaTab[]): NovaStats {
  const urlCounts = new Map<string, number>();
  for (const tab of tabs) {
    const key = canonicalUrl(tab.url);
    urlCounts.set(key, (urlCounts.get(key) || 0) + 1);
  }
  return {
    total: tabs.length,
    windows: new Set(tabs.map(tab => tab.windowId)).size,
    domains: new Set(tabs.map(tab => domainOf(tab.url))).size,
    pinned: tabs.filter(tab => tab.pinned).length,
    audible: tabs.filter(tab => tab.audible && !tab.muted).length,
    duplicates: [...urlCounts.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0),
  };
}

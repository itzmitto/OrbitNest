export type TabInfo = {
  id: number; windowId: number; title: string; domain: string; url: string;
  active: boolean; pinned: boolean; audible: boolean; muted: boolean;
  discarded: boolean; loading: boolean; favIconUrl?: string;
};
export type MissionContext = { tabs: TabInfo[]; query: string; selectedId: number | null };
export type FeatureResult = { value: string; description: string; focus: number[]; tone?: 'cyan' | 'violet' | 'amber' | 'green' };
export type MissionFeature = { id: string; title: string; group: 'Explore' | 'Organize' | 'Inspect';
  description: string; evaluate: (context: MissionContext) => FeatureResult };
export type GraphNode = { id: number; x: number; y: number; radius: number; tab: TabInfo };
export type GraphEdge = { from: number; to: number; kind: 'domain' | 'window' };
export function safeDomain(url: string): string {
  try { const value = new URL(url); return value.protocol === 'http:' || value.protocol === 'https:' ? value.hostname.replace(/^www\./, '') : 'internal'; }
  catch { return 'unknown'; }
}
export function normalizeTabs(items: Array<Record<string, unknown>>): TabInfo[] {
  return items.filter(item => typeof item.id === 'number' && typeof item.windowId === 'number' && !item.incognito)
  .map(item => {
    const url = typeof item.pendingUrl === 'string' && item.pendingUrl ? item.pendingUrl : typeof item.url === 'string' ? item.url : '';
    return { id: item.id as number, windowId: item.windowId as number, url,
      title: String(item.title || safeDomain(url) || 'Untitled tab').slice(0, 180), domain: safeDomain(url),
      active: !!item.active, pinned: !!item.pinned, audible: !!item.audible,
      muted: !!(item.mutedInfo && typeof item.mutedInfo === 'object' && (item.mutedInfo as {muted?: boolean}).muted),
      discarded: !!item.discarded, loading: item.status === 'loading',
      favIconUrl: typeof item.favIconUrl === 'string' ? item.favIconUrl : undefined };
  });
}
function hash(value: string): number { let h = 2166136261; for (const char of value) h = Math.imul(h ^ char.charCodeAt(0), 16777619); return h >>> 0; }
export function makeGraph(tabs: TabInfo[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const count = Math.max(1, tabs.length);
  const nodes = tabs.map((tab, index) => {
    const seed = hash(tab.domain + ':' + tab.id); const arm = index % 4;
    const angle = index * 2.39996 + (seed % 17) * .025;
    const distance = 65 + Math.sqrt(index / count) * 380 + arm * 11;
    return { id: tab.id, tab, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance * .72,
      radius: tab.active ? 15 : tab.pinned ? 12 : 8 + (seed % 5) };
  });
  const edges: GraphEdge[] = [];
  const byDomain = new Map<string, number>(); const byWindow = new Map<number, number>();
  for (const tab of tabs) {
    const previous = byDomain.get(tab.domain);
    if (previous !== undefined && previous !== tab.id && tab.domain !== 'internal') edges.push({ from: previous, to: tab.id, kind: 'domain' });
    else byDomain.set(tab.domain, tab.id);
    const win = byWindow.get(tab.windowId);
    if (win !== undefined && win !== tab.id && edges.length < count * 3) edges.push({ from: win, to: tab.id, kind: 'window' });
    else byWindow.set(tab.windowId, tab.id);
  }
  return {nodes, edges};
}

import type { TabRecord } from '../domain/tab.ts';
import type { GraphEdge, GraphGroup, GraphModel, GraphPoint } from './types.ts';

/** Connectivity means shared domain or window, never a claimed hyperlink between websites. */
export function buildGraph(tabs: readonly TabRecord[], mode: GraphGroup = 'domain'): GraphModel {
  const valid = [...new Map(tabs.filter(tab => Number.isSafeInteger(tab.id) && tab.id >= 0).map(tab => [tab.id, tab])).values()];
  const groups = new Map<string, TabRecord[]>();
  for (const tab of valid) {
    const key = mode === 'window' ? `window:${tab.windowId}` : `domain:${tab.domain || 'unknown'}`;
    const members = groups.get(key) ?? [];
    members.push(tab);
    groups.set(key, members);
  }
  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  const points: GraphPoint[] = [];
  const edges: GraphEdge[] = [];
  for (const [groupNumber, [name, members]] of sortedGroups.entries()) {
    const ordered = [...members].sort((a,b) => a.index - b.index || a.id - b.id);
    for (const tab of ordered) {
      points.push({ id: tab.id, x: 0, y: 0, radius: tab.pinned ? 10 : tab.active ? 9 : 6,
        domain: tab.domain, windowId: tab.windowId, groupKey: name, tab, colorIndex: groupNumber % 8 });
    }
    // A bounded chain with a hub connects the cluster without generating O(n²) edges.
    for (let i = 1; i < ordered.length; i++) {
      edges.push({ source: ordered[i-1].id, target: ordered[i].id, kind: 'group' });
      if (i > 2) edges.push({ source: ordered[0].id, target: ordered[i].id, kind: 'group' });
    }
  }
  // Gentle window hints connect only one representative per group, not every pair of tabs.
  if (mode === 'domain') {
    const seen = new Map<number, number>();
    for (const point of points) {
      const first = seen.get(point.windowId);
      if (first === undefined) seen.set(point.windowId, point.id);
      else if (first !== point.id && point.id % 3 === 0) edges.push({ source: first, target: point.id, kind: 'window' });
    }
  }
  return { points, edges, groupNames: sortedGroups.map(([key]) => key) };
}

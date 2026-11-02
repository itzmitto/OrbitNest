import type { GraphModel } from './types.ts';
export type GraphFilter = 'all' | 'pinned' | 'playing' | 'active';
export function filterGraph(model: GraphModel, query: string, filter: GraphFilter): GraphModel {
  const words = query.trim().normalize('NFKC').toLocaleLowerCase().split(/\s+/).filter(Boolean).slice(0, 8);
  const points = model.points.filter(point => {
    const text = `${point.tab.title} ${point.tab.domain}`.normalize('NFKC').toLocaleLowerCase();
    return words.every(word => text.includes(word)) && (filter === 'all' ||
      (filter === 'pinned' && point.tab.pinned) || (filter === 'playing' && point.tab.audible) || (filter === 'active' && point.tab.active));
  });
  const ids = new Set(points.map(point => point.id));
  return { points, edges: model.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target)), groupNames: [...new Set(points.map(point => point.groupKey))] };
}

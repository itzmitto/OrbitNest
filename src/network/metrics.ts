import type { GraphModel } from './types.ts';
export function graphStats(model: GraphModel) {
  return { planets: model.points.length, links: model.edges.length, groups: model.groupNames.length,
    windows: new Set(model.points.map(point => point.windowId)).size,
    pinned: model.points.filter(point => point.tab.pinned).length };
}

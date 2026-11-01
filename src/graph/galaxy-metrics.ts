import type { PlanetNode } from './planet-system';
export type GalaxyMetrics = { worlds: number; sectors: number; pinned: number; audible: number; families: number };
/** Count only visible metadata, never contents or hidden tabs. */
export function galaxyMetrics(nodes: readonly PlanetNode[]): GalaxyMetrics {
  return {
    worlds: nodes.length,
    sectors: new Set(nodes.map(node => node.tab.windowId)).size,
    pinned: nodes.filter(node => node.tab.pinned).length,
    audible: nodes.filter(node => node.tab.audible && !node.tab.muted).length,
    families: new Set(nodes.map(node => node.kind)).size,
  };
}

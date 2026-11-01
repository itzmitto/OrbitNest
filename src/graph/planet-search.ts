import type { PlanetNode } from './planet-system';
/** Search existing planet metadata locally; never request webpage content. */
export function searchPlanetNodes(nodes: readonly PlanetNode[], query: string): PlanetNode[] {
  const words = query.toLocaleLowerCase().trim().split(/\s+/u).filter(Boolean).slice(0, 8);
  if (!words.length) return [...nodes];
  return nodes.filter(node => {
    const haystack = `${node.tab.title} ${node.tab.domain} ${node.kind}`.toLocaleLowerCase();
    return words.every(word => haystack.includes(word));
  });
}

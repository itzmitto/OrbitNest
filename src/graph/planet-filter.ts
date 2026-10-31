import { PLANET_KINDS, type PlanetKind, type PlanetNode } from './planet-system.ts';
export type PlanetFilter = 'all' | PlanetKind;
export function isPlanetFilter(value: string): value is PlanetFilter {
  return value === 'all' || PLANET_KINDS.some(kind => kind === value);
}
export function filterPlanetNodes(nodes: readonly PlanetNode[], kind: PlanetFilter): PlanetNode[] {
  return kind === 'all' ? [...nodes] : nodes.filter(node => node.kind === kind);
}

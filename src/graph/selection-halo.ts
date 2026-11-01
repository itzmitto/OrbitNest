import type {PlanetNode} from './planet-system';
export type SelectionHalo = { left: number; top: number; diameter: number };
export function selectionHalo(nodes: readonly PlanetNode[], selected: number | null): SelectionHalo | null {
  const node = nodes.find(item => item.id === selected);
  if (!node) return null;
  return { left: node.x, top: node.y, diameter: Math.max(24, node.r * 2 + 34) };
}

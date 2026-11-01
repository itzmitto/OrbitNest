import type { PlanetNode } from './planet-system';

/** Cycle without changing the real browser tab until the user presses Enter. */
export function cyclePlanetFocus(nodes: readonly PlanetNode[], current: number | null, direction: -1 | 1): number | null {
  if (!nodes.length) return null;
  const ordered = [...nodes].sort((a, b) => a.id - b.id);
  const currentIndex = ordered.findIndex(node => node.id === current);
  if (currentIndex < 0) return direction > 0 ? ordered[0].id : ordered[ordered.length - 1].id;
  return ordered[(currentIndex + direction + ordered.length) % ordered.length].id;
}

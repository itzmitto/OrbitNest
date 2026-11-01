import type { PlanetNode } from './planet-system';

/** Keep chosen worlds readable while reducing colliding titles in dense galaxies. */
export function visiblePlanetLabels(nodes: readonly PlanetNode[], preferred: readonly (number | null)[], limit = 54): PlanetNode[] {
  if (!Number.isFinite(limit) || limit <= 0) return [];
  const rank = new Map(preferred.filter((id): id is number => id !== null).map((id, index) => [id, index] as const));
  const ordered = [...nodes].sort((a, b) =>
    (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity) || a.id - b.id
  );
  const rectangles: Array<{ x: number; y: number; w: number; h: number }> = [];
  const output: PlanetNode[] = [];
  for (const node of ordered) {
    if (output.length >= Math.floor(limit)) break;
    const label = { x: node.x - 67, y: node.y + node.r + 8, w: 134, h: 23 };
    const prioritized = rank.has(node.id);
    const overlaps = rectangles.some(rect =>
      label.x < rect.x + rect.w && label.x + label.w > rect.x &&
      label.y < rect.y + rect.h && label.y + label.h > rect.y
    );
    if (prioritized || !overlaps) {
      output.push(node);
      rectangles.push(label);
    }
  }
  return output;
}

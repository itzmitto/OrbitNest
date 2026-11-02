import type { GraphModel, GraphPoint } from './types.ts';

export function graphHash(text: string): number {
  let value = 2166136261;
  for (const character of text) { value ^= character.charCodeAt(0); value = Math.imul(value, 16777619); }
  return value >>> 0;
}

/** Stable radial constellations: opening another tab does not randomly scatter existing groups. */
export function layoutGraph(model: GraphModel): GraphPoint[] {
  if (!model.points.length) return [];
  const groupIndices = new Map(model.groupNames.map((name, i) => [name, i]));
  const count = Math.max(1, model.groupNames.length);
  const byGroup = new Map<string, GraphPoint[]>();
  for (const point of model.points) byGroup.set(point.groupKey, [...(byGroup.get(point.groupKey) ?? []), point]);
  const result: GraphPoint[] = [];
  for (const [key, members] of byGroup) {
    const index = groupIndices.get(key) ?? 0;
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const dist = Math.sqrt(index + 0.4) * Math.max(110, 1300 / Math.sqrt(count + 2));
    const centerX = Math.cos(angle) * dist;
    const centerY = Math.sin(angle) * dist;
    const ordered = [...members].sort((a, b) => a.id - b.id);
    for (const point of ordered) {
      const h = graphHash(`${point.id}:${point.groupKey}`);
      const radial = 35 + Math.sqrt(h % 1600) * 2.5;
      const a = (h % 6283) / 1000;
      result.push({ ...point, x: centerX + Math.cos(a) * radial, y: centerY + Math.sin(a) * radial });
    }
  }
  return result;
}

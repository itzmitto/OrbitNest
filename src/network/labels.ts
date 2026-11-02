import type { GraphPoint } from './types.ts';
export type GraphLabel = Readonly<{ id: number; x: number; y: number; text: string; width: number }>;
/** Hide overlapping low-priority labels; selected and hovered labels are handled by the HUD. */
export function chooseGraphLabels(points: readonly GraphPoint[], zoom: number, limit = 24): GraphLabel[] {
  const output: GraphLabel[] = [];
  if (zoom < 0.6) return output;
  const ordered = [...points].sort((a,b) => Number(b.tab.pinned) - Number(a.tab.pinned) || Number(b.tab.active) - Number(a.tab.active) || a.id - b.id);
  for (const point of ordered) {
    const label = (point.domain || 'untitled').slice(0, 27);
    const width = label.length * 6.7 + 12;
    const y = point.y + point.radius + 16;
    const blocked = output.some(other => Math.abs(other.x - point.x) < (other.width + width) / 2 + 10 && Math.abs(other.y - y) < 16);
    if (!blocked) output.push({ id: point.id, x: point.x, y, text: label, width });
    if (output.length >= limit) break;
  }
  return output;
}

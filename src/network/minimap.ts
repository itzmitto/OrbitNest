import type { GraphPoint } from './types.ts';
export function minimapProjection(points: readonly GraphPoint[], width: number, height: number) {
  if (!points.length) return [];
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const loX = Math.min(...xs), hiX = Math.max(...xs), loY = Math.min(...ys), hiY = Math.max(...ys);
  return points.map(point => ({ id: point.id,
    x: 9 + (point.x-loX) / Math.max(1, hiX-loX) * (width-18),
    y: 9 + (point.y-loY) / Math.max(1, hiY-loY) * (height-18),
    colorIndex: point.colorIndex }));
}

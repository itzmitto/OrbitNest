export function polarPosition(cx: number, cy: number, rx: number, ry: number, angle: number): { x: number; y: number } {
  if (![cx,cy,rx,ry,angle].every(Number.isFinite)) return { x: cx || 0, y: cy || 0 };
  return { x: cx + Math.cos(angle) * Math.max(0,rx), y: cy + Math.sin(angle) * Math.max(0,ry) };
}

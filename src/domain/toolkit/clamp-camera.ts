export function clampCamera(value: number, extent = 10000): number {
  if (!Number.isFinite(value)) return 0;
  const limit = Number.isFinite(extent) ? Math.max(0, Math.abs(extent)) : 10000;
  return Math.max(-limit, Math.min(limit, value));
}

/** Estimate orbital capacity at each layer; compact screens have fewer slots. */
export function orbitCapacity(layer: number, compact = false): number {
  if (!Number.isFinite(layer) || layer < 0) return 0;
  return 5 + Math.min(30, Math.floor(layer)) * (compact ? 5 : 7);
}

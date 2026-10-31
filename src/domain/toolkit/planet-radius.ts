/** Keep planets tappable while reducing overlap as the count rises. */
export function planetRadius(count: number, width: number): number {
  if (!Number.isFinite(count) || !Number.isFinite(width) || width <= 0) return 22;
  const compact = width < 650;
  return Math.max(18, Math.min(compact ? 29 : 44, (compact ? 33 : 49) - Math.sqrt(Math.max(0,count)) * 1.5));
}

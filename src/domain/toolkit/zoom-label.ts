/** Clamp formatting to avoid misleading Infinity or NaN labels. */
export function zoomLabel(zoom: number): string {
  if (!Number.isFinite(zoom) || zoom<=0) return '100%';
  return `${Math.round(Math.min(8,zoom)*100)}%`;
}

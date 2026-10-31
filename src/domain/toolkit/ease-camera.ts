/** Smoothstep for predictable camera transitions; no timer or global state. */
export function easeCamera(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  const t=Math.max(0,Math.min(1,progress));
  return t*t*(3-2*t);
}

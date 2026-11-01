import type { RenderQuality } from './render-quality';
/** Limit decorative stars when many planets compete for GPU and CPU time. */
export function adaptiveStarBudget(requested: number, planets: number, quality: RenderQuality, reducedMotion: boolean): number {
  if (!Number.isFinite(requested) || !Number.isFinite(planets)) return 0;
  const available = Math.max(0, Math.floor(requested));
  const cap = quality === 'battery' ? 38 : planets > 120 ? 52 : planets > 70 ? 85 : quality === 'cinematic' ? 210 : 140;
  return Math.min(available, reducedMotion ? Math.min(cap, 30) : cap);
}

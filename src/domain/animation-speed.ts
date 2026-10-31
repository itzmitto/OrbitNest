export type AnimationSpeed = 'drift' | 'normal' | 'hyperdrive';
export function parseAnimationSpeed(value: unknown): AnimationSpeed {
  return value === 'drift' || value === 'hyperdrive' ? value : 'normal';
}
export const ANIMATION_FACTORS: Readonly<Record<AnimationSpeed, number>> = { drift: 0.38, normal: 1, hyperdrive: 2.25 };

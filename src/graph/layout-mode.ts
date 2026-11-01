export type GalaxyLayout = 'orbits' | 'spiral';
export const GALAXY_LAYOUTS: readonly GalaxyLayout[] = ['orbits','spiral'];
export function parseGalaxyLayout(value: unknown): GalaxyLayout {
  return value === 'spiral' ? 'spiral' : 'orbits';
}

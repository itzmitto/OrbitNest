export type GalaxyPalette = 'midnight' | 'aurora' | 'ember';
export function parseGalaxyPalette(value: unknown): GalaxyPalette {
  return value === 'aurora' || value === 'ember' ? value : 'midnight';
}

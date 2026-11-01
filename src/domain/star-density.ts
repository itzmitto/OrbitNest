export type StarDensity='minimal'|'classic'|'cinematic';
export const STAR_COUNTS:Readonly<Record<StarDensity,number>>={minimal:36,classic:112,cinematic:218};
export function parseStarDensity(value:unknown):StarDensity {
  return value==='minimal'||value==='cinematic'?value:'classic';
}

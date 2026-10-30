import type { PlanetPoint } from './draw';
export function hitPlanet(points: PlanetPoint[], x: number, y: number): PlanetPoint | undefined {
  return [...points].reverse().find((point)=>Math.hypot(point.x-x,point.y-y)<=point.r+4);
}

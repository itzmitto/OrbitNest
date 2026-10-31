export type Coord = {x:number;y:number};
export function nodeDistance(a: Coord,b: Coord): number {
  if (![a.x,a.y,b.x,b.y].every(Number.isFinite)) return Infinity;
  return Math.hypot(a.x-b.x,a.y-b.y);
}

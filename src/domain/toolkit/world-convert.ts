export type WorldPoint = {x:number;y:number};
export function toWorld(point: WorldPoint, center: WorldPoint, zoom: number, pan: WorldPoint): WorldPoint {
  if (!Number.isFinite(zoom) || zoom <= 0) return { ...point };
  return { x:center.x+(point.x-center.x-pan.x)/zoom, y:center.y+(point.y-center.y-pan.y)/zoom };
}

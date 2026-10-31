export type ScreenPoint = {x:number;y:number};
export function toScreen(point: ScreenPoint, center: ScreenPoint, zoom: number, pan: ScreenPoint): ScreenPoint {
  if (!Number.isFinite(zoom) || zoom <= 0) return { ...point };
  return { x:center.x+(point.x-center.x)*zoom+pan.x, y:center.y+(point.y-center.y)*zoom+pan.y };
}

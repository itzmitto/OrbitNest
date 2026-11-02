import type { GraphPoint, GraphViewport } from './types.ts';
export const MIN_ZOOM = 0.25, MAX_ZOOM = 4;
export function graphToScreen(x: number, y: number, width: number, height: number, camera: GraphViewport) {
  return { x: width / 2 + (x + camera.x) * camera.zoom, y: height / 2 + (y + camera.y) * camera.zoom };
}
export function graphToWorld(x: number, y: number, width: number, height: number, camera: GraphViewport) {
  return { x: (x - width / 2) / camera.zoom - camera.x, y: (y - height / 2) / camera.zoom - camera.y };
}
export function graphZoomAt(camera: GraphViewport, wheel: number, x: number, y: number, w: number, h: number): GraphViewport {
  if (!Number.isFinite(wheel) || !w || !h) return camera;
  const before = graphToWorld(x, y, w, h, camera);
  const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.zoom * (wheel > 0 ? 0.89 : 1.12)));
  return { zoom, x: (x - w/2) / zoom - before.x, y: (y - h/2) / zoom - before.y };
}
export function graphFit(points: readonly GraphPoint[], width: number, height: number): GraphViewport {
  if (!points.length || width <= 0 || height <= 0) return { x: 0, y: 0, zoom: 1 };
  const xs = points.map(point => point.x), ys = points.map(point => point.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const zoom = Math.min(1.7, Math.max(MIN_ZOOM, Math.min(width * 0.82 / Math.max(160,maxX-minX), height * 0.82 / Math.max(160,maxY-minY))));
  return { x: -(minX + maxX)/2, y: -(minY + maxY)/2, zoom };
}

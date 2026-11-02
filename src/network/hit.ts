import type { GraphPoint, GraphViewport } from './types.ts';
import { graphToWorld } from './camera.ts';
export function pickGraphPoint(points: readonly GraphPoint[], x: number, y: number, width: number, height: number, camera: GraphViewport) {
  const world = graphToWorld(x,y,width,height,camera);
  return [...points].reverse().find(point => Math.hypot(world.x-point.x, world.y-point.y) < Math.max(12, point.radius + 7 / camera.zoom));
}

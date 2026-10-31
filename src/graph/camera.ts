import type { PlanetNode } from './planet-system';

export type CameraOffset = { x: number; y: number };

/** Recenter the visible system on the active planet, preserving user pan. */
export function centerOnPlanet(nodes: readonly PlanetNode[], tabId: number, width: number, height: number, current: CameraOffset): CameraOffset {
  const target = nodes.find(node => node.id === tabId);
  if (!target || width <= 0 || height <= 0) return current;
  return { x: current.x + width / 2 - target.x, y: current.y + height / 2 - target.y };
}


/** Zoom around a pointer without allowing the world beneath it to jump. */
export function zoomAtPoint(
  zoom: number, offset: CameraOffset, point: CameraOffset,
  width: number, height: number, change: number,
): { zoom: number; offset: CameraOffset } {
  if (![zoom, offset.x, offset.y, point.x, point.y, width, height, change].every(Number.isFinite) || zoom <= 0) {
    return { zoom, offset };
  }
  const nextZoom = Math.min(2.25, Math.max(0.55, Math.round((zoom * Math.exp(-change * 0.0014)) * 100) / 100));
  const ratio = nextZoom / zoom;
  return { zoom: nextZoom, offset: {
    x: offset.x + (point.x - width / 2 - offset.x) * (1 - ratio),
    y: offset.y + (point.y - height / 2 - offset.y) * (1 - ratio),
  }};
}

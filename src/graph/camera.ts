import type { PlanetNode } from './planet-system';

export type CameraOffset = { x: number; y: number };

/** Recenter the visible system on the active planet, preserving user pan. */
export function centerOnPlanet(nodes: readonly PlanetNode[], tabId: number, width: number, height: number, current: CameraOffset): CameraOffset {
  const target = nodes.find(node => node.id === tabId);
  if (!target || width <= 0 || height <= 0) return current;
  return { x: current.x + width / 2 - target.x, y: current.y + height / 2 - target.y };
}

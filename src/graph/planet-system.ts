import type { TabRecord } from '../domain/tab';

export type PlanetKind = 'ocean' | 'gas' | 'volcanic' | 'ice' | 'desert' | 'forest' | 'amethyst';
export const PLANET_KINDS: readonly PlanetKind[] = ['ocean', 'gas', 'volcanic', 'ice', 'desert', 'forest', 'amethyst'];
export type PlanetNode = {
  tab: TabRecord;
  id: number;
  x: number;
  y: number;
  r: number;
  kind: PlanetKind;
  kindIndex: number;
  orbit: number;
  phase: number;
  speed: number;
  seed: number;
  ringed: boolean;
};

export function stableHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Independent tabs stay independent; a domain determines the planet family. */
export function createPlanetNodes(tabs: readonly TabRecord[], width: number, height: number, zoom = 1, offset = { x: 0, y: 0 }): PlanetNode[] {
  if (!tabs.length) return [];
  const cx = width / 2 + offset.x;
  const cy = height / 2 + offset.y;
  const compact = width < 680;
  const capacity = (orbit: number) => 5 + orbit * (compact ? 5 : 7);
  const ordered = [...tabs].sort((a, b) => a.domain.localeCompare(b.domain) || a.id - b.id);
  let cursor = 0;
  let orbit = 0;
  const result: PlanetNode[] = [];
  while (cursor < ordered.length) {
    const count = Math.min(capacity(orbit), ordered.length - cursor);
    const layers = Math.max(2, Math.ceil(Math.sqrt(ordered.length / 3.5)));
    const rx = Math.min(width * 0.435, (width * 0.435) * (orbit + 1) / layers);
    const ry = Math.min(height * 0.405, (height * 0.405) * (orbit + 1) / layers);
    for (let i = 0; i < count; i++) {
      const tab = ordered[cursor + i];
      const seed = stableHash(`${tab.domain}:${tab.id}`);
      const domainHash = stableHash(tab.domain);
      const kindIndex = domainHash % PLANET_KINDS.length;
      const angle = -Math.PI / 2 + (i + ((orbit % 2) * 0.42)) * 2 * Math.PI / count;
      const eccentricity = 0.96 + (seed % 100) / 1300;
      const radius = Math.max(13, Math.min(37, (compact ? 26 : 33) - orbit * 2.5 + (seed % 8)));
      const x = cx + Math.cos(angle) * rx * eccentricity * zoom;
      const y = cy + Math.sin(angle) * ry * eccentricity * zoom;
      result.push({
        tab, id: tab.id, x, y,
        r: radius * zoom,
        kind: PLANET_KINDS[kindIndex], kindIndex, orbit,
        phase: (seed % 360) * Math.PI / 180,
        speed: 0.11 + (seed % 80) / 260,
        seed: (seed % 997) / 997,
        ringed: kindIndex === 1 || (seed % 9 === 0 && kindIndex !== 2),
      });
    }
    cursor += count;
    orbit++;
  }
  return result;
}

export function findPlanet(nodes: readonly PlanetNode[], x: number, y: number): PlanetNode | undefined {
  return [...nodes].reverse().find(node => Math.hypot(node.x - x, node.y - y) <= node.r + 13);
}

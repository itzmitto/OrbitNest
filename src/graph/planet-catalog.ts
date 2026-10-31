import type { TabRecord } from '../domain/tab';
import { createPlanetNodes, type PlanetKind } from './planet-system.ts';

export type WorldEntry = {
  id: number;
  title: string;
  domain: string;
  kind: PlanetKind;
  tab: TabRecord;
};

export const WORLD_NAMES: Readonly<Record<PlanetKind, string>> = {
  ocean: 'Ocean world',
  gas: 'Gas giant',
  volcanic: 'Volcanic world',
  ice: 'Ice giant',
  desert: 'Desert planet',
  forest: 'Forest world',
  amethyst: 'Crystal planet',
  nebula: 'Nebula giant',
  moon: 'Lunar world',
  aurora: 'Aurora world',
};

/** A deterministic, capped sampling of live planets for the accessible atlas. */
export function selectFeaturedWorlds(tabs: readonly TabRecord[], limit = 5): WorldEntry[] {
  if (!Number.isInteger(limit) || limit <= 0) return [];
  const nodes = createPlanetNodes(tabs, 1200, 740);
  const seen = new Set<PlanetKind>();
  const unique: typeof nodes = [];
  const repeated: typeof nodes = [];
  for (const node of nodes) {
    if (seen.has(node.kind)) repeated.push(node);
    else { seen.add(node.kind); unique.push(node); }
  }
  return [...unique, ...repeated].slice(0, Math.min(limit, 8)).map(node => ({
    id: node.id,
    title: node.tab.title,
    domain: node.tab.domain,
    kind: node.kind,
    tab: node.tab,
  }));
}

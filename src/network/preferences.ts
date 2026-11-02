import type { GraphTheme, GraphGroup } from './types.ts';
import { parseGraphTheme } from './palette.ts';
export type GraphPreferences = { theme: GraphTheme; group: GraphGroup; showLinks: boolean; animated: boolean };
export const GRAPH_PREF_KEY = 'orbitnest:network:preferences:v1';
export const DEFAULT_GRAPH_PREFS: GraphPreferences = { theme: 'obsidian', group: 'domain', showLinks: true, animated: true };
export function parseGraphPreferences(value: unknown): GraphPreferences {
  if (!value || typeof value !== 'object') return { ...DEFAULT_GRAPH_PREFS };
  const input = value as Partial<GraphPreferences>;
  return { theme: parseGraphTheme(input.theme), group: input.group === 'window' ? 'window' : 'domain',
    showLinks: input.showLinks !== false, animated: input.animated !== false };
}

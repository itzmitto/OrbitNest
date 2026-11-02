import type { GraphTheme } from './types.ts';
export const GRAPH_THEMES: readonly GraphTheme[] = ['obsidian','nebula','aurora'];
export const GROUP_COLORS = ['#ff656b', '#8ca9ff', '#8cf4bb', '#eba6df', '#f3c777', '#82e3f2', '#b9a3ff', '#ef90a7'];
export function graphColor(index: number, theme: GraphTheme = 'obsidian'): string {
  const shift = theme === 'nebula' ? 3 : theme === 'aurora' ? 5 : 0;
  return GROUP_COLORS[(((index + shift) % GROUP_COLORS.length) + GROUP_COLORS.length) % GROUP_COLORS.length];
}
export function parseGraphTheme(value: unknown): GraphTheme { return typeof value === 'string' && GRAPH_THEMES.includes(value as GraphTheme) ? value as GraphTheme : 'obsidian'; }

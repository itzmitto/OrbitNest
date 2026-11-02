import type { TabRecord } from '../domain/tab.ts';

export type GraphGroup = 'domain' | 'window';
export type GraphTheme = 'nebula' | 'obsidian' | 'aurora';
export type GraphPoint = Readonly<{
  id: number; x: number; y: number; radius: number;
  domain: string; windowId: number; groupKey: string;
  tab: TabRecord; colorIndex: number;
}>;
export type GraphEdge = Readonly<{ source: number; target: number; kind: 'group' | 'window' }>;
export type GraphModel = Readonly<{ points: GraphPoint[]; edges: GraphEdge[]; groupNames: string[] }>;
export type GraphViewport = Readonly<{ x: number; y: number; zoom: number }>;
export const INITIAL_GRAPH_VIEW: GraphViewport = { x: 0, y: 0, zoom: 1 };

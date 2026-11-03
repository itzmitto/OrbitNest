import type { TabInfo } from '../mission/model';
export type StudioTab = TabInfo;
export type StudioNode = { id: number; x: number; y: number; radius: number; tab: StudioTab };
export type StudioEdge = { from: number; to: number; kind: 'domain' | 'window' };
export type StudioLayout = { id: string; label: string; place: (tabs: StudioTab[]) => StudioNode[] };
export type StudioPalette = { id: string; label: string; back: string; center: string; accent: string; planet: string; link: string; starDensity: number };
export type StudioLens = { id: string; label: string; filter: (tabs: StudioTab[]) => StudioTab[] };

export type Page = 'planetarium' | 'atlas' | 'observatory' | 'sessions' | 'mission-control' | 'preferences';
export type ThemeName = 'nebula' | 'eclipse' | 'aurora' | 'solar';
export interface BrowserTab {
  id: number; windowId: number; index: number; url: string; title: string;
  favicon: string; active: boolean; pinned: boolean; audible: boolean;
  muted: boolean; discarded: boolean;
}
export interface Planet {
  id: string; tab: BrowserTab; x: number; y: number; z: number; radius: number;
  hue: number; material: number; moonCount: number;
}
export type PlanetSelector = (tabs: BrowserTab[]) => BrowserTab[];
export interface CameraState { yaw: number; pitch: number; distance: number; targetX: number; targetY: number; }
export interface OrbitPreset { id: string; label: string; description: string;
  place(index: number, count: number, seed: number): {x:number;y:number;z:number}; }
export interface TabLens { id: string; label: string; description: string; select: PlanetSelector; }
export interface Signal { id: string; label: string; description: string;
  calculate(tabs: BrowserTab[]): {value: number; unit: string; detail: string}; }
export interface Palette { id: ThemeName; name: string; background: string; accent: string; second: string; }

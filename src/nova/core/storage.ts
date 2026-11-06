import type {NovaTab} from './model.ts';
export interface TabBookmark { title: string; url: string; pinned: boolean }
export interface SavedOrbit { id: string; name: string; createdAt: string; tabs: TabBookmark[] }
export interface OrbitSettings { theme: 'void' | 'aurora' | 'ember'; density: 'relaxed' | 'compact'; motion: boolean }
const KEY='orbitnest:nova:sessions:v1';
const PREFS='orbitnest:nova:settings:v1';
export const DEFAULT_SETTINGS: OrbitSettings={theme:'void',density:'relaxed',motion:true};
const webUrl=(value: string) => {
  try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)}catch{return false;}
};
export function safeBookmarks(tabs: NovaTab[]): TabBookmark[] {
  return tabs.filter(tab=>webUrl(tab.url)).slice(0,200).map(tab=>({
    title:tab.title.slice(0,150),url:tab.url,pinned:tab.pinned,
  }));
}
export function parseOrbits(raw: unknown): SavedOrbit[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0,30).flatMap((entry: unknown): SavedOrbit[] => {
    if(!entry || typeof entry!=='object')return [];
    const item=entry as Record<string,unknown>;
    if(typeof item.id!=='string'||typeof item.name!=='string'||!Array.isArray(item.tabs))return [];
    const tabs: TabBookmark[]=item.tabs.slice(0,200).flatMap((entry: unknown): TabBookmark[]=>{
      if(!entry||typeof entry!=='object')return [];
      const bookmark=entry as Record<string,unknown>;
      if(typeof bookmark.url!=='string'||!webUrl(bookmark.url))return [];
      return [{url:bookmark.url,title:String(bookmark.title??bookmark.url).slice(0,150),pinned:Boolean(bookmark.pinned)}];
    });
    return [{id:item.id.slice(0,64),name:item.name.slice(0,80),createdAt:String(item.createdAt||''),tabs}];
  });
}
export function loadOrbits(storage: Pick<Storage,'getItem'>=localStorage): SavedOrbit[] {
  try {return parseOrbits(JSON.parse(storage.getItem(KEY)||'[]'))}catch{return []}
}
export function saveOrbits(items: SavedOrbit[],storage: Pick<Storage,'setItem'>=localStorage): boolean {
  try {storage.setItem(KEY,JSON.stringify(parseOrbits(items)));return true}catch{return false}
}
export function loadSettings(storage: Pick<Storage,'getItem'>=localStorage): OrbitSettings {
  try {
    const value=JSON.parse(storage.getItem(PREFS)||'{}') as Partial<OrbitSettings>;
    return {theme:['void','aurora','ember'].includes(value.theme||'')?value.theme!:DEFAULT_SETTINGS.theme,
      density:value.density==='compact'?'compact':'relaxed',motion:value.motion!==false};
  }catch{return {...DEFAULT_SETTINGS}}
}
export function saveSettings(value:OrbitSettings,storage:Pick<Storage,'setItem'>=localStorage):boolean{
  try {storage.setItem(PREFS,JSON.stringify(value));return true}catch{return false}
}

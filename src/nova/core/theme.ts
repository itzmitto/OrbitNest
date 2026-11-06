import {DEFAULT_SETTINGS,loadSettings,saveSettings,type OrbitSettings} from './storage.ts';
export interface NovaPalette {id:OrbitSettings['theme'];label:string;accent:string;secondary:string;background:string}
export const PALETTES:NovaPalette[]=[
 {id:'void',label:'Deep Void',accent:'#82f3e5',secondary:'#a896ff',background:'#030614'},
 {id:'aurora',label:'Aurora Fields',accent:'#97ffc2',secondary:'#66c6ff',background:'#031815'},
 {id:'ember',label:'Solar Ember',accent:'#ffca93',secondary:'#ff829e',background:'#1c0b15'},
];
export function normalizeSettings(value:Partial<OrbitSettings>):OrbitSettings{
 return {theme:PALETTES.some(p=>p.id===value.theme)?value.theme!:DEFAULT_SETTINGS.theme,
  density:value.density==='compact'?'compact':'relaxed',motion:value.motion!==false};
}
export function applyNovaSettings(root:HTMLElement,value:OrbitSettings):void{
 root.dataset.novaTheme=value.theme;root.dataset.novaDensity=value.density;
 root.dataset.novaMotion=value.motion?'on':'off';
}
export function getCurrentSettings():OrbitSettings{return normalizeSettings(loadSettings());}
export function updateSettings(root:HTMLElement,value:OrbitSettings):boolean{
 const normalized=normalizeSettings(value);applyNovaSettings(root,normalized);return saveSettings(normalized);
}

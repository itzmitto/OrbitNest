import type {UiTheme} from './types.ts';
export interface AetherPreferences {theme:UiTheme;motion:boolean;stars:boolean;showLabels:boolean;}
export const defaultPreferences:AetherPreferences={theme:'midnight',motion:true,stars:true,showLabels:true};
const storageKey='orbitnest-aether-settings-v1';
export function validatePreferences(value:unknown):AetherPreferences {
 if(!value||typeof value!=='object')return {...defaultPreferences};
 const record=value as Partial<AetherPreferences>;
 return {theme:['midnight','cosmic','amber'].includes(String(record.theme))?record.theme as UiTheme:'midnight',
 motion:typeof record.motion==='boolean'?record.motion:true,
 stars:typeof record.stars==='boolean'?record.stars:true,
 showLabels:typeof record.showLabels==='boolean'?record.showLabels:true};
}
export function loadPreferences():AetherPreferences {
 try{return validatePreferences(JSON.parse(localStorage.getItem(storageKey)||'null'));}catch{return {...defaultPreferences};}
}
export function savePreferences(value:AetherPreferences):boolean {
 try{localStorage.setItem(storageKey,JSON.stringify(validatePreferences(value)));return true;}catch{return false;}
}

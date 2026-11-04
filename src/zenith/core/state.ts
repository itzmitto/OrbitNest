import type {CameraState,ThemeName} from './types.ts';
export interface Preferences {theme:ThemeName;reducedMotion:boolean;showLabels:boolean;showTrails:boolean;planetScale:number;density:number;}
export const defaults:Preferences={theme:'nebula',reducedMotion:false,showLabels:true,showTrails:true,planetScale:1,density:1};
export const defaultCamera:CameraState={yaw:-.23,pitch:.24,distance:24,targetX:0,targetY:0};
const prefix='orbitnest.zenith.v1.';
export function readStored<T>(key:string,fallback:T,validate?:(value:unknown)=>value is T):T {
 try{const raw=localStorage.getItem(prefix+key);if(!raw)return fallback;const parsed:unknown=JSON.parse(raw);return !validate||validate(parsed)?parsed:fallback;}catch{return fallback;}
}
export function writeStored(key:string,value:unknown):void {try{localStorage.setItem(prefix+key,JSON.stringify(value));}catch{/* blocked or full */}}
export function getPreferences():Preferences {
 const input=readStored<Partial<Preferences>>('preferences',{});
 return {...defaults,...input,theme:['nebula','eclipse','aurora','solar'].includes(String(input.theme))?input.theme!:defaults.theme,
 planetScale:typeof input.planetScale==='number'?Math.max(.6,Math.min(1.6,input.planetScale)):1,
 density:typeof input.density==='number'?Math.max(.5,Math.min(2,input.density)):1};
}
export const savePreferences=(value:Preferences):void=>writeStored('preferences',value);

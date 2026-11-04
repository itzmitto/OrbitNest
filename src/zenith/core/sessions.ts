import {readStored,writeStored} from './state';
import {formatHost} from './math';
import type {BrowserTab} from './types';
export interface SavedTab {title:string;url:string;pinned:boolean;}
export interface SavedSession {id:string;name:string;createdAt:string;tabs:SavedTab[];}
export function validateSession(value:unknown):value is SavedSession{
 if(!value||typeof value!=='object')return false;const s=value as Partial<SavedSession>;
 return typeof s.id==='string'&&typeof s.name==='string'&&typeof s.createdAt==='string'&&Array.isArray(s.tabs)&&s.tabs.every(t=>typeof t.url==='string'&&/^https?:\/\//.test(t.url)&&typeof t.title==='string');
}
export function getSessions():SavedSession[]{const items=readStored<unknown>('sessions',[]);return Array.isArray(items)?items.filter(validateSession).slice(0,50):[];}
export function captureSession(tabs:BrowserTab[],name:string):SavedSession{
 const safeName=name.trim().slice(0,70)||`Constellation ${new Date().toLocaleDateString()}`;
 return {id:`session-${Date.now()}-${Math.floor(Math.random()*100000)}`,name:safeName,createdAt:new Date().toISOString(),
  tabs:tabs.filter(t=>/^https?:\/\//.test(t.url)).slice(0,400).map(t=>({title:t.title,url:t.url,pinned:t.pinned}))};
}
export function saveSession(session:SavedSession):SavedSession[]{const sessions=[session,...getSessions()].slice(0,50);writeStored('sessions',sessions);return sessions;}
export function deleteSession(id:string):SavedSession[]{const remaining=getSessions().filter(s=>s.id!==id);writeStored('sessions',remaining);return remaining;}
export function exportSessions():string{return JSON.stringify({version:1,exportedAt:new Date().toISOString(),sessions:getSessions()},null,2);}
export function importSessions(json:string):number{let data:unknown;try{data=JSON.parse(json);}catch{return 0;}
 const root=data as {sessions?:unknown};if(!Array.isArray(root?.sessions))return 0;
 const valid=root.sessions.filter(validateSession).slice(0,50),existing=getSessions();writeStored('sessions',[...valid,...existing.filter(s=>!valid.some(n=>n.id===s.id))].slice(0,50));return valid.length;}
export async function restoreSession(session:SavedSession):Promise<number>{
 const api=(globalThis as unknown as {chrome?:{tabs?:{create(options:object,cb?:(tab:unknown)=>void):void}}}).chrome;
 if(!api?.tabs?.create)return 0;let restored=0;
 for(const tab of session.tabs){if(!/^https?:\/\//.test(tab.url))continue;
 try{await new Promise<void>(resolve=>api.tabs!.create({url:tab.url,active:false,pinned:tab.pinned},()=>resolve()));restored++;}catch{break;}}
 return restored;
}

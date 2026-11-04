import type {BrowserTab} from './types.ts';
import {formatHost} from './math.ts';
const sampleTitles=['GitHub · Development','Creative workspace','Watch later','Documentation','Your email','Music studio','Design references','Project board','New inspiration','OrbitNest'];
const sampleHosts=['github.com','figma.com','youtube.com','developer.mozilla.org','mail.google.com','open.spotify.com','pinterest.com','linear.app','unsplash.com','orbitnest.local'];
export const demoTabs:BrowserTab[]=sampleTitles.map((title,index)=>({
 id:1000+index,windowId:index>=7?2:1,index,url:`https://${sampleHosts[index]}/`,title,
 favicon:'',active:index===0,pinned:index===0||index===3,audible:index===2||index===5,muted:false,discarded:false
}));
interface BrowserApi { tabs?:{
  query(query:object,callback:(tabs:unknown[])=>void):void;
  update(id:number,props:object,callback?:(tab:unknown)=>void):void;
  remove(id:number,callback?:()=>void):void;
  create(props:object,callback?:(tab:unknown)=>void):void;
 }; runtime?:{lastError?:unknown}; }
function api():BrowserApi|null {
 const obj=(globalThis as unknown as {chrome?:BrowserApi}).chrome;
 return obj?.tabs?.query ? obj : null;
}
export function hasLiveTabs():boolean{return Boolean(api());}
export function normalizeTab(value:unknown,index:number):BrowserTab {
 const raw=value as Record<string,unknown>;
 return {id:Number(raw.id??1000+index),windowId:Number(raw.windowId??1),index:Number(raw.index??index),
 url:String(raw.url??''),title:String(raw.title??formatHost(String(raw.url??''))),
 favicon:String(raw.favIconUrl??''),active:Boolean(raw.active),pinned:Boolean(raw.pinned),
 audible:Boolean(raw.audible),muted:Boolean((raw.mutedInfo as Record<string,unknown>|undefined)?.muted),discarded:Boolean(raw.discarded)};
}
export async function getTabs():Promise<BrowserTab[]> {
 const chrome=api();if(!chrome?.tabs) return demoTabs;
 return await new Promise(resolve=>{try{chrome.tabs!.query({},items=>resolve(items.map(normalizeTab)));}catch{resolve(demoTabs);}});
}
export async function applyTabAction(id:number,action:'open'|'pin'|'unpin'|'mute'|'unmute'|'close'):Promise<boolean> {
 const chrome=api();if(!chrome?.tabs||id>=1000)return false;
 return await new Promise(resolve=>{
  try{
   if(action==='close'){chrome.tabs!.remove(id,()=>resolve(true));return;}
   const settings=action==='open'?{active:true}:action==='pin'?{pinned:true}:action==='unpin'?{pinned:false}:action==='mute'?{muted:true}:{muted:false};
   chrome.tabs!.update(id,settings,()=>resolve(true));
  }catch{resolve(false);}
 });
}
export function groupByHost(tabs:BrowserTab[]):Map<string,BrowserTab[]> {
 const groups=new Map<string,BrowserTab[]>();for(const tab of tabs){const key=formatHost(tab.url);groups.set(key,[...(groups.get(key)||[]),tab]);}
 return groups;
}

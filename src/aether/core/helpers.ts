import type {BrowserTab} from './types.ts';
export const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
export function host(url:string):string {
 try {const item=new URL(url);return item.protocol==='http:'||item.protocol==='https:'?item.hostname.replace(/^www\./,''):'Local page';}
 catch {return 'New tab';}
}
export function safeHttp(url:string):boolean{try {const u=new URL(url);return u.protocol==='http:'||u.protocol==='https:';} catch {return false;}}
export function countBy<T>(items:T[],selector:(item:T)=>string):Map<string,number>{
 const result=new Map<string,number>();for(const item of items){const key=selector(item);result.set(key,(result.get(key)||0)+1);}return result;
}
export function topEntries(counts:Map<string,number>,limit=12):[string,number][]{
 return [...counts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,limit);
}
export function normalizedUrl(url:string):string {
 try {const parsed=new URL(url);if(!['http:','https:'].includes(parsed.protocol))return url;
 parsed.hash='';parsed.hostname=parsed.hostname.toLowerCase();if(parsed.pathname!=='/')parsed.pathname=parsed.pathname.replace(/\/$/,'');return parsed.href;}
 catch{return url;}
}
export function byWindow(tabs:BrowserTab[]):Map<number,BrowserTab[]> {
 const result=new Map<number,BrowserTab[]>();for(const tab of tabs){const list=result.get(tab.windowId)||[];list.push(tab);result.set(tab.windowId,list);}return result;
}
export function readableDuration(totalSeconds:number):string {
 const sec=Math.max(0,Math.floor(totalSeconds));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;
 return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}:${String(s).padStart(2,'0')}`;
}
export function safeTitle(tab:BrowserTab):string{return (tab.title||host(tab.url)).trim().slice(0,135)||'Untitled planet';}

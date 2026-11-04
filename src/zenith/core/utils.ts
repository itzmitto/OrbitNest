import type {BrowserTab,Planet} from './types.ts';
import {formatHost,escapeHTML} from './math.ts';
export function safeTitle(tab:BrowserTab):string{return escapeHTML(tab.title||formatHost(tab.url));}
export function formatTime(date:Date):string{return new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit'}).format(date);}
export function uniqueDomains(tabs:BrowserTab[]):number{return new Set(tabs.map(t=>formatHost(t.url))).size;}
export function windowsCount(tabs:BrowserTab[]):number{return new Set(tabs.map(t=>t.windowId)).size;}
export function getPlanetById(planets:Planet[],id:string|null):Planet|undefined{return planets.find(p=>p.id===id);}
export function filterTabs(tabs:BrowserTab[],query:string):BrowserTab[]{const q=query.trim().toLowerCase();return tabs.filter(tab=>[tab.title,tab.url,formatHost(tab.url)].some(v=>v.toLowerCase().includes(q)));}
export function formatSize(n:number):string{return n>=1000?`${(n/1000).toFixed(1)}k`:String(n);}

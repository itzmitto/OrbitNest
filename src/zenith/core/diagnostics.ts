import type {BrowserTab} from './types.ts';
export interface Diagnostics{tabCount:number;domains:number;windows:number;audio:number;pinned:number;duplicates:number;discards:number;percentageActive:number;}
export function diagnose(tabs:BrowserTab[]):Diagnostics{
 const hosts=new Set<string>(),windows=new Set<number>(),urls=new Set<string>();let duplicates=0;
 for(const tab of tabs){windows.add(tab.windowId);
 try{hosts.add(new URL(tab.url).hostname);}catch{hosts.add('local');}
 if(urls.has(tab.url))duplicates++;else urls.add(tab.url);}
 return {tabCount:tabs.length,domains:hosts.size,windows:windows.size,audio:tabs.filter(t=>t.audible).length,
 pinned:tabs.filter(t=>t.pinned).length,duplicates,discards:tabs.filter(t=>t.discarded).length,
 percentageActive:tabs.length?Math.round(tabs.filter(t=>t.active).length/tabs.length*100):0};
}
export function healthMessage(d:Diagnostics):string{
 if(d.tabCount===0)return 'Your universe is empty. Open some websites to get started.';
 if(d.duplicates>=5)return 'Several duplicate tabs are open. Explore Mission Control for cleanup.';
 if(d.discards>=5)return 'Your browser has paused multiple tabs to save memory.';
 return 'Your browser galaxy is online and ready to explore.';
}

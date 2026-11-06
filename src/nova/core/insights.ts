import {domainOf,type NovaTab} from './model.ts';
export interface WindowInsight {windowId:number;total:number;active:number;pinned:number;audible:number;uniqueDomains:number}
export interface InsightBar {label:string;count:number;percentage:number}
export function windowInsights(tabs:NovaTab[]):WindowInsight[]{
 const windows=new Map<number,NovaTab[]>();
 for(const tab of tabs)windows.set(tab.windowId,[...(windows.get(tab.windowId)||[]),tab]);
 return [...windows].map(([windowId,items])=>({windowId,total:items.length,active:items.filter(t=>t.active).length,
  pinned:items.filter(t=>t.pinned).length,audible:items.filter(t=>t.audible&&!t.muted).length,
  uniqueDomains:new Set(items.map(t=>domainOf(t.url))).size})).sort((a,b)=>b.total-a.total);
}
export function domainDistribution(tabs:NovaTab[],max=12):InsightBar[]{
 const counts=new Map<string,number>();for(const tab of tabs){const host=domainOf(tab.url);counts.set(host,(counts.get(host)||0)+1)}
 return [...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,max).map(([label,count])=>({
  label,count,percentage:tabs.length?Math.round(count/tabs.length*100):0}));
}
export function tabBalance(tabs:NovaTab[]):{focus:number;media:number;reading:number;other:number}{
 let focus=0,media=0,reading=0,other=0;
 for(const tab of tabs){const url=tab.url.toLowerCase();
  if(tab.active||tab.pinned){focus++;continue}
  if(tab.audible||/youtube|spotify|twitch|netflix/.test(url)){media++;continue}
  if(/docs\.|developer\.|medium\.|wikipedia\.|read/.test(url)){reading++;continue}
  other++;
 }
 return {focus,media,reading,other};
}

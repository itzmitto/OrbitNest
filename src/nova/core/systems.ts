import {clusterTabs,domainOf,type NovaTab} from './model.ts';
export interface SystemLink {from:string;to:string;sharedWindows:number;weight:number}
export interface WorldProfile {domain:string;tabs:NovaTab[];total:number;active:number;pinned:number;windows:number}
export function profileDomain(tabs:NovaTab[],domain:string):WorldProfile{
 const group=tabs.filter(tab=>domainOf(tab.url)===domain);
 return {domain,tabs:group,total:group.length,active:group.filter(tab=>tab.active).length,
  pinned:group.filter(tab=>tab.pinned).length,windows:new Set(group.map(tab=>tab.windowId)).size};
}
export function suggestSystemLinks(tabs:NovaTab[],limit=16):SystemLink[]{
 const worlds=clusterTabs(tabs).slice(0,16);
 const byWindow=new Map<number,Set<string>>();
 for(const tab of tabs){const value=byWindow.get(tab.windowId)||new Set<string>();value.add(domainOf(tab.url));byWindow.set(tab.windowId,value);}
 const links:SystemLink[]=[];
 for(let i=0;i<worlds.length;i++)for(let j=i+1;j<worlds.length;j++){
  const left=worlds[i].host,right=worlds[j].host;
  const sharedWindows=[...byWindow.values()].filter(window=>window.has(left)&&window.has(right)).length;
  if(sharedWindows)links.push({from:left,to:right,sharedWindows,weight:sharedWindows/Math.max(1,Math.min(worlds[i].count,worlds[j].count))});
 }
 return links.sort((a,b)=>b.sharedWindows-a.sharedWindows||a.from.localeCompare(b.from)).slice(0,limit);
}
export function searchSystems(tabs:NovaTab[],query:string):WorldProfile[]{
 const term=query.toLowerCase().trim();
 return clusterTabs(tabs).filter(world=>!term||world.host.includes(term)||world.tabs.some(tab=>tab.title.toLowerCase().includes(term)))
  .map(world=>profileDomain(tabs,world.host));
}

import {canonicalUrl,type NovaTab} from './model.ts';
export interface DuplicateGroup {url:string;keep:NovaTab;extras:NovaTab[];saved:number}
export function findDuplicateGroups(tabs:NovaTab[]):DuplicateGroup[]{
 const groups=new Map<string,NovaTab[]>();
 for(const tab of tabs){
  const url=canonicalUrl(tab.url);
  if(!/^https?:\/\//.test(url))continue;
  groups.set(url,[...(groups.get(url)||[]),tab]);
 }
 const result:DuplicateGroup[]=[];
 for(const [url,group] of groups){if(group.length<2)continue;
  const ordered=[...group].sort((a,b)=>Number(b.active)-Number(a.active)||Number(b.pinned)-Number(a.pinned)||a.index-b.index);
  const keep=ordered[0],extras=ordered.slice(1).filter(tab=>!tab.active&&!tab.pinned);
  result.push({url,keep,extras,saved:extras.length});
 }
 return result.sort((a,b)=>b.saved-a.saved||a.url.localeCompare(b.url));
}
export function previewDuplicateCleanup(tabs:NovaTab[]):{eligible:number;protected:number;urls:string[]}{
 const groups=findDuplicateGroups(tabs);
 return {eligible:groups.reduce((sum,g)=>sum+g.extras.length,0),
  protected:groups.reduce((sum,g)=>sum+1+g.extras.filter(t=>t.active||t.pinned).length,0),
  urls:groups.map(group=>group.url)};
}

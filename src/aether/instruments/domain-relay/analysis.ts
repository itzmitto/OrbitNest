 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {host} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Detects domains present in multiple windows to make project separation easier. */
 export function evaluateDomainRelay(tabs:BrowserTab[]):InstrumentBucket[]{
 const sites=new Map<string,Set<number>>();
for(const tab of tabs){const domain=host(tab.url),set=sites.get(domain)||new Set<number>();set.add(tab.windowId);sites.set(domain,set);}
return [...sites].filter(([,windows])=>windows.size>1).map(([label,windows])=>({label,count:windows.size,
 detail:`This domain appears across ${windows.size} separate browser windows.`})).sort((a,b)=>b.count-a.count);
 }
 export function analyzeDomainRelay(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateDomainRelay(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Cross-window domain relay",description:"Detects domains present in multiple windows to make project separation easier.",
   metrics:[{label:"Shared systems",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Windows can contain purposeful overlaps; repeated domains are not automatically duplicates.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

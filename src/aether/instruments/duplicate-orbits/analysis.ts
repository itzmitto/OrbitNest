 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {normalizedUrl,safeHttp} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Finds matching web addresses after removing fragments and trailing slashes. Queries are preserved. */
 export function evaluateDuplicateOrbits(tabs:BrowserTab[]):InstrumentBucket[]{
 const lookup=new Map<string,BrowserTab[]>();
for(const tab of tabs){if(!safeHttp(tab.url))continue;const key=normalizedUrl(tab.url);const list=lookup.get(key)||[];list.push(tab);lookup.set(key,list);}
return [...lookup].filter(([,list])=>list.length>1).map(([url,list])=>({label:url,count:list.length-1,
 detail:`${list.length} matching tabs across ${new Set(list.map(tab=>tab.windowId)).size} windows. Keep one before closing any.`})).sort((a,b)=>b.count-a.count);
 }
 export function analyzeDuplicateOrbits(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateDuplicateOrbits(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Duplicate planet finder",description:"Finds matching web addresses after removing fragments and trailing slashes. Queries are preserved.",
   metrics:[{label:"Duplicate copies",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Open each matching group before removing copies. The tool never closes tabs automatically.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

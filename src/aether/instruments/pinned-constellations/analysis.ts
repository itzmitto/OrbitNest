 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Surfaces pinned tabs grouped by domain and shows which are concentrated in each window. */
 export function evaluatePinnedConstellations(tabs:BrowserTab[]):InstrumentBucket[]{
 const pinned=tabs.filter(t=>t.pinned),counts=countBy(pinned,t=>host(t.url));
return topEntries(counts,45).map(([label,count])=>({label,count,detail:`Pinned references at this domain; ${pinned.filter(t=>host(t.url)===label&&t.active).length} currently active.`}));
 }
 export function analyzePinnedConstellations(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluatePinnedConstellations(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Pinned constellations",description:"Surfaces pinned tabs grouped by domain and shows which are concentrated in each window.",
   metrics:[{label:"Pinned worlds",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Pinned tabs are usually persistent references, not necessarily the tabs you use most.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

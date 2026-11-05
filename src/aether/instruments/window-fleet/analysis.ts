 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {host,byWindow} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Summarizes each open browser window, including pinned tabs and website diversity. */
 export function evaluateWindowFleet(tabs:BrowserTab[]):InstrumentBucket[]{
 const windows=byWindow(tabs);
return [...windows.entries()].map(([id,items])=>({label:`Window ${id}`,count:items.length,
 detail:`${new Set(items.map(t=>host(t.url))).size} sites · ${items.filter(t=>t.pinned).length} pinned · ${items.filter(t=>t.active).length} active.`})).sort((a,b)=>b.count-a.count);
 }
 export function analyzeWindowFleet(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateWindowFleet(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Window fleet navigator",description:"Summarizes each open browser window, including pinned tabs and website diversity.",
   metrics:[{label:"Window occupancy",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Window identifiers are temporary runtime values and are not permanent workspace names.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

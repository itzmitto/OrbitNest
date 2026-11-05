 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {safeHttp} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Lists restorable web addresses by window without writing to storage. */
 export function evaluateSessionPreview(tabs:BrowserTab[]):InstrumentBucket[]{
 const groups=new Map<number,{total:number,safe:number,pinned:number}>();
for(const tab of tabs){const row=groups.get(tab.windowId)||{total:0,safe:0,pinned:0};row.total++;if(safeHttp(tab.url))row.safe++;if(tab.pinned)row.pinned++;groups.set(tab.windowId,row);}
return [...groups].map(([windowId,row])=>({label:`Window ${windowId}`,count:row.safe,
 detail:`${row.total} total · ${row.safe} HTTP(S) restore candidates · ${row.pinned} pinned references.`})).sort((a,b)=>b.count-a.count);
 }
 export function analyzeSessionPreview(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateSessionPreview(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Session launch preview",description:"Lists restorable web addresses by window without writing to storage.",
   metrics:[{label:"Restorable tabs",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"You can use the existing Zenith Sessions page to save or restore tab sets.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

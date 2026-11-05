 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Extracts frequently repeated title terms to surface topics across currently open tabs. */
 export function evaluateTabSearch(tabs:BrowserTab[]):InstrumentBucket[]{
 const stop=new Set(['the','and','with','this','that','from','your','have','will','about','https','page','home','into','open','site']);
const counts=new Map<string,number>();for(const tab of tabs){const tokens=new Set((tab.title||'').toLowerCase().match(/[a-z]{4,}/g)||[]);
 for(const token of tokens){if(stop.has(token))continue;counts.set(token,(counts.get(token)||0)+1);}}
return topEntries(counts,45).map(([label,count])=>({label,count,detail:`Appears in the titles of ${count} currently open pages.`}));
 }
 export function analyzeTabSearch(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateTabSearch(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Galaxy title explorer",description:"Extracts frequently repeated title terms to surface topics across currently open tabs.",
   metrics:[{label:"Repeated topics",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Term frequency is based on page titles only. It does not inspect website content.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

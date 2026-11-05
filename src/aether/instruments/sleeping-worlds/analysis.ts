 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Shows tabs the browser reports as discarded; no memory usage is estimated. */
 export function evaluateSleepingWorlds(tabs:BrowserTab[]):InstrumentBucket[]{
 const asleep=tabs.filter(t=>t.discarded),counts=countBy(asleep,t=>host(t.url));
return topEntries(counts,50).map(([label,count])=>({label,count,detail:`${count} tab${count===1?'':'s'} currently marked discarded by the browser.`}));
 }
 export function analyzeSleepingWorlds(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateSleepingWorlds(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Sleeping worlds",description:"Shows tabs the browser reports as discarded; no memory usage is estimated.",
   metrics:[{label:"Discarded planets",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Discarded indicates a browser lifecycle status, not proof that a tab is unused.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

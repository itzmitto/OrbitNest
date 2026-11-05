 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Uses the Herfindahl concentration index of current tab-domain counts. */
 export function evaluateGalaxyBalance(tabs:BrowserTab[]):InstrumentBucket[]{
 const counts=countBy(tabs,t=>host(t.url));const total=Math.max(1,tabs.length);
return topEntries(counts,50).map(([label,count])=>({label,count,detail:`${Math.round(count/total*100)}% of open tabs. Contribution to concentration: ${(Math.pow(count/total,2)*100).toFixed(1)}%.`}));
 }
 export function analyzeGalaxyBalance(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateGalaxyBalance(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Galaxy balance monitor",description:"Uses the Herfindahl concentration index of current tab-domain counts.",
   metrics:[{label:"Domain concentration",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Concentration is descriptive; working in one application can be perfectly reasonable.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

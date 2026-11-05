 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Groups open tabs by normalized host. This counts current tabs only, not browsing history. */
 export function evaluateDomainSystems(tabs:BrowserTab[]):InstrumentBucket[]{
 const counts=countBy(tabs,tab=>host(tab.url));
return topEntries(counts,60).map(([label,count])=>({label,count,detail:`${count} open page${count===1?'':'s'} from this website.`}));
 }
 export function analyzeDomainSystems(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateDomainSystems(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Domain star systems",description:"Groups open tabs by normalized host. This counts current tabs only, not browsing history.",
   metrics:[{label:"Website clusters",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Try exploring the largest systems first, then close tabs you no longer need.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

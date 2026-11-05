 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Reviews basic title metadata without scanning page content. */
 export function evaluatePlanetMetadata(tabs:BrowserTab[]):InstrumentBucket[]{
 const classify=(t:BrowserTab)=>{const title=t.title.trim();
 if(!title)return 'Missing titles';if(title.length>80)return 'Long titles';
 if(/^(new tab|untitled|home|index|about:blank)$/i.test(title))return 'Generic titles';return 'Clearly named tabs';};
const counts=countBy(tabs,classify);return topEntries(counts).map(([label,count])=>({label,count,detail:'Current tab title metadata only.'}));
 }
 export function analyzePlanetMetadata(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluatePlanetMetadata(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Planet metadata quality",description:"Reviews basic title metadata without scanning page content.",
   metrics:[{label:"Title diagnostics",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"A missing title usually reflects browser loading or website metadata, not an error in OrbitNest.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

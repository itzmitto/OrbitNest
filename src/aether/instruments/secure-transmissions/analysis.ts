 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Classifies the transport scheme reported for each open tab; it is not a website security audit. */
 export function evaluateSecureTransmissions(tabs:BrowserTab[]):InstrumentBucket[]{
 const count={https:0,http:0,internal:0,other:0};
for(const tab of tabs){let protocol='';try{protocol=new URL(tab.url).protocol;}catch{}
 if(protocol==='https:')count.https++;else if(protocol==='http:')count.http++;
 else if(['chrome:','edge:','about:','file:'].includes(protocol))count.internal++;else count.other++;}
return [{label:'HTTPS pages',count:count.https,detail:'Pages using encrypted HTTPS connections.'},{label:'Plain HTTP pages',count:count.http,detail:'Connections without HTTPS transport protection.'},
 {label:'Browser or local pages',count:count.internal,detail:'Browser settings, file and internal tabs.'},
 {label:'Other or unavailable URLs',count:count.other,detail:'Nonstandard schemes or missing URL metadata.'}].filter(row=>row.count>0);
 }
 export function analyzeSecureTransmissions(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateSecureTransmissions(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Protocol sentinel",description:"Classifies the transport scheme reported for each open tab; it is not a website security audit.",
   metrics:[{label:"Protocol families",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"HTTPS encrypts transport, but it does not guarantee that a website is trustworthy.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

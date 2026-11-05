 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {normalizedUrl,safeHttp} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Classifies open tab URLs for session backup eligibility and duplicates without opening anything. */
 export function evaluateRestorePreflight(tabs:BrowserTab[]):InstrumentBucket[]{
 const seen=new Set<string>();let safe=0,duplicate=0,blocked=0;
for(const tab of tabs){if(!safeHttp(tab.url)){blocked++;continue;}const url=normalizedUrl(tab.url);if(seen.has(url))duplicate++;else seen.add(url);safe++;}
return [{label:'Safe web links',count:safe,detail:'HTTP(S) addresses eligible for a session snapshot.'},
 {label:'Repeated web links',count:duplicate,detail:'Additional copies of web addresses after normalization.'},
 {label:'Unsupported or internal',count:blocked,detail:'Internal browser pages excluded from restoration.'}].filter(item=>item.count>0);
 }
 export function analyzeRestorePreflight(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateRestorePreflight(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Restore safety preview",description:"Classifies open tab URLs for session backup eligibility and duplicates without opening anything.",
   metrics:[{label:"Restore checks",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Only HTTP(S) pages are eligible for the current Zenith session restoration API.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

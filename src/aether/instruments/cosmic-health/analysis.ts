 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {normalizedUrl,safeHttp} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** A transparent heuristic of currently open tabs, not a security, productivity or health assessment. */
 export function evaluateCosmicHealth(tabs:BrowserTab[]):InstrumentBucket[]{
 const seen=new Set<string>();let duplicate=0,insecure=0,audio=0,discarded=0;
for(const tab of tabs){if(safeHttp(tab.url)){const url=normalizedUrl(tab.url);if(seen.has(url))duplicate++;else seen.add(url);}if(tab.url.startsWith('http://'))insecure++;
 if(tab.audible&&!tab.muted)audio++;if(tab.discarded)discarded++;}
return [{label:'Duplicate links',count:duplicate,detail:'Extra copies of matching normalized URLs.'},
 {label:'Plain HTTP links',count:insecure,detail:'Pages using unencrypted HTTP transport.'},
 {label:'Audible interruptions',count:audio,detail:'Tabs currently marked audible and not muted.'},
 {label:'Discarded planets',count:discarded,detail:'Tabs put to sleep by the browser.'}];
 }
 export function analyzeCosmicHealth(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateCosmicHealth(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Cosmic workspace health",description:"A transparent heuristic of currently open tabs, not a security, productivity or health assessment.",
   metrics:[{label:"Improvement opportunities",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"A lower score only means more open-tab hygiene signals; it is not a judgment on your productivity.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

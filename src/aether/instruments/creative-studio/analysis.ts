 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Finds familiar art, video and design services among current browser tabs. */
 export function evaluateCreativeStudio(tabs:BrowserTab[]):InstrumentBucket[]{
 const result=new Map<string,number>();
for(const tab of tabs){const domain=host(tab.url);
 const family=/figma|canva|penpot|photoshop/i.test(domain)?'Design tools':
 /artstation|deviantart|behance|dribbble|pinterest/i.test(domain)?'Art references':
 /youtube|vimeo|tiktok|twitch/i.test(domain)?'Video inspiration':
 /unsplash|pexels|pixabay/i.test(domain)?'Photo references':null;
 if(family)result.set(family,(result.get(family)||0)+1);}
return topEntries(result).map(([label,count])=>({label,count,detail:'Browser tab with a recognized creative website.'}));
 }
 export function analyzeCreativeStudio(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateCreativeStudio(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Creative studio systems",description:"Finds familiar art, video and design services among current browser tabs.",
   metrics:[{label:"Creative references",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Creative categories are approximate and do not reveal or read private artwork.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

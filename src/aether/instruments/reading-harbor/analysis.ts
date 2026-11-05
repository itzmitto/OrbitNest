 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {countBy,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Uses URL-path hints to suggest potential reading material, not actual reading progress. */
 export function evaluateReadingHarbor(tabs:BrowserTab[]):InstrumentBucket[]{
 const kind=(url:string)=>{let p='';try{p=new URL(url).pathname.toLowerCase();}catch{return 'Other pages';}
 if(/\/(docs|guide|manual|reference|api)(\/|$)/.test(p))return 'Documentation';
 if(/\/(articles?|blog|posts?|news|stories)(\/|$)/.test(p))return 'Articles and posts';
 if(/\/(tutorials?|lessons?|learn|courses?)(\/|$)/.test(p))return 'Learning resources';
 return 'Other pages';};
const counts=countBy(tabs,t=>kind(t.url));return topEntries(counts).map(([label,count])=>({label,count,detail:'Estimated from the page URL structure, not its content.'}));
 }
 export function analyzeReadingHarbor(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateReadingHarbor(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Reading harbor",description:"Uses URL-path hints to suggest potential reading material, not actual reading progress.",
   metrics:[{label:"Reading candidates",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"These classifications are guesses based on URLs. They do not read the pages themselves.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

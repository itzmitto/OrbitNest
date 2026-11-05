 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 import {host,topEntries} from '../../core/helpers.ts';
export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Recognizes common development hosts and URL patterns in your open browser tabs. */
 export function evaluateDeveloperHangar(tabs:BrowserTab[]):InstrumentBucket[]{
 const result=new Map<string,number>();
for(const tab of tabs){const domain=host(tab.url);
 const family=/github|gitlab|bitbucket|gitea/i.test(domain)?'Git hosting':
 /stackoverflow|stackexchange|superuser/i.test(domain)?'Technical Q&A':
 /developer\.|docs\.|documentation|typescriptlang|rust-lang|php\.net|python\.org/i.test(domain)?'Documentation':
 /localhost|127\.0\.0\.1|vercel\.app|netlify\.app/i.test(domain)?'Local and preview sites':null;
 if(family)result.set(family,(result.get(family)||0)+1);}
return topEntries(result).map(([label,count])=>({label,count,detail:`${count} open development-related tab${count===1?'':'s'}.`}));
 }
 export function analyzeDeveloperHangar(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateDeveloperHangar(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Developer hangar",description:"Recognizes common development hosts and URL patterns in your open browser tabs.",
   metrics:[{label:"Development tabs",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"This is a convenience categorization based on public hostnames, not a judgment about your work.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

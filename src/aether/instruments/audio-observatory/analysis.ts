 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Separates tabs currently emitting audio, muted tabs and silent tabs using Chrome tab metadata. */
 export function evaluateAudioObservatory(tabs:BrowserTab[]):InstrumentBucket[]{
 const states=[{label:'Playing audio',count:tabs.filter(t=>t.audible&&!t.muted).length,detail:'Tabs emitting audible sound right now.'},
 {label:'Muted planets',count:tabs.filter(t=>t.muted).length,detail:'Tabs the browser has muted, whether active or not.'},
 {label:'Silent planets',count:tabs.filter(t=>!t.audible&&!t.muted).length,detail:'Tabs not marked as audible or muted.'}];
return states.filter(s=>s.count>0);
 }
 export function analyzeAudioObservatory(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateAudioObservatory(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Audio radar",description:"Separates tabs currently emitting audio, muted tabs and silent tabs using Chrome tab metadata.",
   metrics:[{label:"Audio status",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"Muted does not mean a tab is currently playing. Audible and muted are separate browser flags.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

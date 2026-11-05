 import type {BrowserTab,AetherReport} from '../../core/types.ts';
 export interface InstrumentBucket {label:string;count:number;detail:string;}
 /** Finds silent and non-active tabs that could be placed into a separate workspace. */
 export function evaluateQuietZone(tabs:BrowserTab[]):InstrumentBucket[]{
 const states=[
 {label:'Active focus',count:tabs.filter(t=>t.active).length,detail:'Currently selected tabs in each browser window.'},
 {label:'Background silent',count:tabs.filter(t=>!t.active&&!t.audible).length,detail:'Background tabs that are not marked audible.'},
 {label:'Background playing audio',count:tabs.filter(t=>!t.active&&t.audible).length,detail:'Background tabs that may interrupt concentration.'},
 {label:'Pinned references',count:tabs.filter(t=>t.pinned&&!t.active).length,detail:'Pinned context available without switching tasks.'}
];return states.filter(s=>s.count>0);
 }
 export function analyzeQuietZone(tabs:BrowserTab[]):AetherReport{
  const buckets=evaluateQuietZone(tabs),total=buckets.reduce((sum,row)=>sum+row.count,0);
  const primary=buckets[0];
  return {title:"Quiet zone planning",description:"Finds silent and non-active tabs that could be placed into a separate workspace.",
   metrics:[{label:"Attention groups",value:String(total),context:'CURRENT OPEN TABS'},
            {label:'Groups found',value:String(buckets.length),context:'DISTINCT SIGNAL TYPES'},
            {label:'Largest group',value:primary?String(primary.count):'0',context:primary?.label||'NO MATCH'}],
   rows:buckets.map((row,index)=>({id:String(index),title:row.label,description:row.detail})),
   summary:"The tool does not close, mute or move tabs automatically. It only offers a snapshot.",emptyMessage:'No matching planets in this workspace.',
   notes:['All figures are derived locally from the current browser tabs. No server requests are made.']};
 }

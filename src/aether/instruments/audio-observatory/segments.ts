import type {BrowserTab} from '../../core/types.ts';
import {evaluateAudioObservatory} from './analysis.ts';
import type {SignalPoint} from '../../ui/chart.ts';
/** A stable normalized chart model: every visible bar comes from source data. */
export function segmentAudioObservatory(tabs:BrowserTab[],limit=12):SignalPoint[]{
 const buckets=evaluateAudioObservatory(tabs);
 const total=buckets.reduce((sum,item)=>sum+item.count,0);
 const ranked=buckets.filter(row=>row.count>=0).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label)).slice(0,Math.max(0,Math.min(30,limit)));
 return ranked.map((row,index)=>({
  label:row.label,value:row.count,share:total>0?Math.round(row.count/total*10000)/100:0,
  detail:row.detail,rank:index+1
 }));
}
export function describeAudioObservatorySpread(tabs:BrowserTab[]):string{
 const groups=segmentAudioObservatory(tabs,60),sum=groups.reduce((n,g)=>n+g.value,0);
 if(!sum)return 'No matching categories in this tab universe.';
 const main=groups[0],remaining=Math.max(0,100-main.share);
 return `Largest: ${main.label} (${main.share.toFixed(1)}%). Remaining categories share ${remaining.toFixed(1)}%.`;
}

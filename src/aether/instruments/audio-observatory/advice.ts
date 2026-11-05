import type {BrowserTab} from '../../core/types.ts';
import type {InstrumentBucket} from './analysis.ts';
/** Actionable explanations are suggestions; never perform browser actions. */
export function adviceAudioObservatory(tabs:BrowserTab[],buckets:InstrumentBucket[]):string[]{
 const notes:string[]=[];
 if(tabs.length===0)return ['Open some browser tabs to get a live workspace analysis.'];
 if(buckets.length===0)return ['No matching signals were detected. Your current workspace may not use this tool.'];
 const biggest=buckets.reduce((a,b)=>b.count>a.count?b:a,buckets[0]);
 const proportion=biggest.count/Math.max(1,tabs.length);
 if(proportion>.5)notes.push(`Large cluster: ${biggest.label} accounts for ${Math.round(proportion*100)}% of the open planets or signals.`);
 if(buckets.length>7)notes.push('Several different categories are visible. Try reviewing one group at a time.');
 notes.push("Muted does not mean a tab is currently playing. Audible and muted are separate browser flags.");
 return notes;
}

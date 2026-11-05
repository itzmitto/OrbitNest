import type {AetherFeature} from '../../core/types.ts';
import {analyzeAudioObservatory,evaluateAudioObservatory} from './analysis.ts';
import {adviceAudioObservatory} from './advice.ts';
import {renderAudioObservatoryView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const audio_observatoryFeature:AetherFeature={
 id:"audio-observatory",label:"Audio radar",category:"Live browser",
 short:"See every sounding, muted and silent planet in one place.",
 analyze(tabs){
  const report=analyzeAudioObservatory(tabs),advice=adviceAudioObservatory(tabs,evaluateAudioObservatory(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderAudioObservatoryView(tabs);}
};

import type {AetherFeature} from '../../core/types.ts';
import {analyzeRestorePreflight,evaluateRestorePreflight} from './analysis.ts';
import {adviceRestorePreflight} from './advice.ts';
import {renderRestorePreflightView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const restore_preflightFeature:AetherFeature={
 id:"restore-preflight",label:"Restore safety preview",category:"Session management",
 short:"Inspect unsafe URLs and repeated links before restoring a session.",
 analyze(tabs){
  const report=analyzeRestorePreflight(tabs),advice=adviceRestorePreflight(tabs,evaluateRestorePreflight(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderRestorePreflightView(tabs);}
};

import type {AetherFeature} from '../../core/types.ts';
import {analyzeQuietZone,evaluateQuietZone} from './analysis.ts';
import {adviceQuietZone} from './advice.ts';
import {renderQuietZoneView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const quiet_zoneFeature:AetherFeature={
 id:"quiet-zone",label:"Quiet zone planning",category:"Focus workflow",
 short:"Identify a calmer subset of tabs for focused work.",
 analyze(tabs){
  const report=analyzeQuietZone(tabs),advice=adviceQuietZone(tabs,evaluateQuietZone(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderQuietZoneView(tabs);}
};

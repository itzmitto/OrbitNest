import type {AetherFeature} from '../../core/types.ts';
import {analyzeSleepingWorlds,evaluateSleepingWorlds} from './analysis.ts';
import {adviceSleepingWorlds} from './advice.ts';
import {renderSleepingWorldsView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const sleeping_worldsFeature:AetherFeature={
 id:"sleeping-worlds",label:"Sleeping worlds",category:"Browser performance",
 short:"Locate browser-discarded tabs and preserve context.",
 analyze(tabs){
  const report=analyzeSleepingWorlds(tabs),advice=adviceSleepingWorlds(tabs,evaluateSleepingWorlds(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderSleepingWorldsView(tabs);}
};

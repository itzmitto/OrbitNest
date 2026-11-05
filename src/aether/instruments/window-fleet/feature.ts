import type {AetherFeature} from '../../core/types.ts';
import {analyzeWindowFleet,evaluateWindowFleet} from './analysis.ts';
import {adviceWindowFleet} from './advice.ts';
import {renderWindowFleetView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const window_fleetFeature:AetherFeature={
 id:"window-fleet",label:"Window fleet navigator",category:"Workspace layout",
 short:"Discover how browser windows distribute tabs and domains.",
 analyze(tabs){
  const report=analyzeWindowFleet(tabs),advice=adviceWindowFleet(tabs,evaluateWindowFleet(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderWindowFleetView(tabs);}
};

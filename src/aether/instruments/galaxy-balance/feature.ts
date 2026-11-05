import type {AetherFeature} from '../../core/types.ts';
import {analyzeGalaxyBalance,evaluateGalaxyBalance} from './analysis.ts';
import {adviceGalaxyBalance} from './advice.ts';
import {renderGalaxyBalanceView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const galaxy_balanceFeature:AetherFeature={
 id:"galaxy-balance",label:"Galaxy balance monitor",category:"Workspace insights",
 short:"Measure whether one website dominates your open workspace.",
 analyze(tabs){
  const report=analyzeGalaxyBalance(tabs),advice=adviceGalaxyBalance(tabs,evaluateGalaxyBalance(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderGalaxyBalanceView(tabs);}
};

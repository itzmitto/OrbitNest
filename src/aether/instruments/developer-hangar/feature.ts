import type {AetherFeature} from '../../core/types.ts';
import {analyzeDeveloperHangar,evaluateDeveloperHangar} from './analysis.ts';
import {adviceDeveloperHangar} from './advice.ts';
import {renderDeveloperHangarView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const developer_hangarFeature:AetherFeature={
 id:"developer-hangar",label:"Developer hangar",category:"Project workflow",
 short:"Map programming references, code reviews and development tools.",
 analyze(tabs){
  const report=analyzeDeveloperHangar(tabs),advice=adviceDeveloperHangar(tabs,evaluateDeveloperHangar(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderDeveloperHangarView(tabs);}
};

import type {AetherFeature} from '../../core/types.ts';
import {analyzeReadingHarbor,evaluateReadingHarbor} from './analysis.ts';
import {adviceReadingHarbor} from './advice.ts';
import {renderReadingHarborView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const reading_harborFeature:AetherFeature={
 id:"reading-harbor",label:"Reading harbor",category:"Knowledge workspace",
 short:"Spot likely articles, documentation and long-form references.",
 analyze(tabs){
  const report=analyzeReadingHarbor(tabs),advice=adviceReadingHarbor(tabs,evaluateReadingHarbor(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderReadingHarborView(tabs);}
};

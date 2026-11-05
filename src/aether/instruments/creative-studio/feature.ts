import type {AetherFeature} from '../../core/types.ts';
import {analyzeCreativeStudio,evaluateCreativeStudio} from './analysis.ts';
import {adviceCreativeStudio} from './advice.ts';
import {renderCreativeStudioView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const creative_studioFeature:AetherFeature={
 id:"creative-studio",label:"Creative studio systems",category:"Creative workflow",
 short:"Collect visual references and creative platform tabs.",
 analyze(tabs){
  const report=analyzeCreativeStudio(tabs),advice=adviceCreativeStudio(tabs,evaluateCreativeStudio(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderCreativeStudioView(tabs);}
};

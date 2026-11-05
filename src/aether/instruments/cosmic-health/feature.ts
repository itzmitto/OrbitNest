import type {AetherFeature} from '../../core/types.ts';
import {analyzeCosmicHealth,evaluateCosmicHealth} from './analysis.ts';
import {adviceCosmicHealth} from './advice.ts';
import {renderCosmicHealthView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const cosmic_healthFeature:AetherFeature={
 id:"cosmic-health",label:"Cosmic workspace health",category:"Workspace insights",
 short:"Combine duplicate, audio and insecure-link signals into an explainable workspace score.",
 analyze(tabs){
  const report=analyzeCosmicHealth(tabs),advice=adviceCosmicHealth(tabs,evaluateCosmicHealth(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderCosmicHealthView(tabs);}
};

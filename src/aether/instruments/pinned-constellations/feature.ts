import type {AetherFeature} from '../../core/types.ts';
import {analyzePinnedConstellations,evaluatePinnedConstellations} from './analysis.ts';
import {advicePinnedConstellations} from './advice.ts';
import {renderPinnedConstellationsView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const pinned_constellationsFeature:AetherFeature={
 id:"pinned-constellations",label:"Pinned constellations",category:"Tab hygiene",
 short:"View permanent reference tabs without touching their pinned state.",
 analyze(tabs){
  const report=analyzePinnedConstellations(tabs),advice=advicePinnedConstellations(tabs,evaluatePinnedConstellations(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderPinnedConstellationsView(tabs);}
};

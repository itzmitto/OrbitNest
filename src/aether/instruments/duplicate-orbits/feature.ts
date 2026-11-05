import type {AetherFeature} from '../../core/types.ts';
import {analyzeDuplicateOrbits,evaluateDuplicateOrbits} from './analysis.ts';
import {adviceDuplicateOrbits} from './advice.ts';
import {renderDuplicateOrbitsView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const duplicate_orbitsFeature:AetherFeature={
 id:"duplicate-orbits",label:"Duplicate planet finder",category:"Tab hygiene",
 short:"Find duplicate URLs and avoid closing the wrong tab.",
 analyze(tabs){
  const report=analyzeDuplicateOrbits(tabs),advice=adviceDuplicateOrbits(tabs,evaluateDuplicateOrbits(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderDuplicateOrbitsView(tabs);}
};

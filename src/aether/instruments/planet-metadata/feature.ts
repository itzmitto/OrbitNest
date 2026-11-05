import type {AetherFeature} from '../../core/types.ts';
import {analyzePlanetMetadata,evaluatePlanetMetadata} from './analysis.ts';
import {advicePlanetMetadata} from './advice.ts';
import {renderPlanetMetadataView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const planet_metadataFeature:AetherFeature={
 id:"planet-metadata",label:"Planet metadata quality",category:"Workspace insights",
 short:"Detect unnamed, overly long and generic tab titles.",
 analyze(tabs){
  const report=analyzePlanetMetadata(tabs),advice=advicePlanetMetadata(tabs,evaluatePlanetMetadata(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderPlanetMetadataView(tabs);}
};

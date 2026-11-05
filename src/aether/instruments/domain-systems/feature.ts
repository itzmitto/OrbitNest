import type {AetherFeature} from '../../core/types.ts';
import {analyzeDomainSystems,evaluateDomainSystems} from './analysis.ts';
import {adviceDomainSystems} from './advice.ts';
import {renderDomainSystemsView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const domain_systemsFeature:AetherFeature={
 id:"domain-systems",label:"Domain star systems",category:"Galaxy intelligence",
 short:"Map websites into constellations and reveal your largest clusters.",
 analyze(tabs){
  const report=analyzeDomainSystems(tabs),advice=adviceDomainSystems(tabs,evaluateDomainSystems(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderDomainSystemsView(tabs);}
};

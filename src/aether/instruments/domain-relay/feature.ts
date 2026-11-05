import type {AetherFeature} from '../../core/types.ts';
import {analyzeDomainRelay,evaluateDomainRelay} from './analysis.ts';
import {adviceDomainRelay} from './advice.ts';
import {renderDomainRelayView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const domain_relayFeature:AetherFeature={
 id:"domain-relay",label:"Cross-window domain relay",category:"Workspace layout",
 short:"Find websites spread across several browser windows.",
 analyze(tabs){
  const report=analyzeDomainRelay(tabs),advice=adviceDomainRelay(tabs,evaluateDomainRelay(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderDomainRelayView(tabs);}
};

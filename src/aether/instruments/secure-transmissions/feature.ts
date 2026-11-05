import type {AetherFeature} from '../../core/types.ts';
import {analyzeSecureTransmissions,evaluateSecureTransmissions} from './analysis.ts';
import {adviceSecureTransmissions} from './advice.ts';
import {renderSecureTransmissionsView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const secure_transmissionsFeature:AetherFeature={
 id:"secure-transmissions",label:"Protocol sentinel",category:"Security awareness",
 short:"Separate secure pages, HTTP links and internal browser pages.",
 analyze(tabs){
  const report=analyzeSecureTransmissions(tabs),advice=adviceSecureTransmissions(tabs,evaluateSecureTransmissions(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderSecureTransmissionsView(tabs);}
};

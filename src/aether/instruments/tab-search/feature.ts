import type {AetherFeature} from '../../core/types.ts';
import {analyzeTabSearch,evaluateTabSearch} from './analysis.ts';
import {adviceTabSearch} from './advice.ts';
import {renderTabSearchView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const tab_searchFeature:AetherFeature={
 id:"tab-search",label:"Galaxy title explorer",category:"Discovery",
 short:"Find common words in open page titles, without indexing history.",
 analyze(tabs){
  const report=analyzeTabSearch(tabs),advice=adviceTabSearch(tabs,evaluateTabSearch(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderTabSearchView(tabs);}
};

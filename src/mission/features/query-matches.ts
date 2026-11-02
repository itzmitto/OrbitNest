import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'query-matches', title: "Search matches", group: 'Explore',
  description: "Search open tabs by domain or title words",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const terms=context.query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);const found=terms.length?tabs.filter(t=>terms.every(term=>`${t.title} ${t.domain}`.toLowerCase().includes(term))):[];return result(`${found.length} matches`, terms.length?'Matching browser titles and domain names are highlighted.':'Use the instrument filter to find a mode, or set a search query in a future update.',found.map(t=>t.id));
  }
};

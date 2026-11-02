import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'pinned-orbits', title: "Pinned orbits", group: 'Organize',
  description: "Discover tabs pinned to their browser window",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.pinned);return result(`${found.length} pinned`,'Pinned tabs are highlighted; no tab state is changed.',found.map(t=>t.id));
  }
};

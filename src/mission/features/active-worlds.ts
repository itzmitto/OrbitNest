import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'active-worlds', title: "Active worlds", group: 'Inspect',
  description: "Highlight active tabs across all windows",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.active);return result(`${found.length} active`, 'One active tab may exist in each browser window.',found.map(t=>t.id));
  }
};

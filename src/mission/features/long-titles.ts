import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'long-titles', title: "Long titles", group: 'Organize',
  description: "Locate tabs with long descriptive titles",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.title.length>72);return result(`${found.length} long`, 'Long titles can be difficult to scan; use the inspector for details.',found.map(t=>t.id));
  }
};

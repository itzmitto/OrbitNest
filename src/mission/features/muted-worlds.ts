import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'muted-worlds', title: "Muted worlds", group: 'Inspect',
  description: "Locate tabs which have muted audio",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.muted);return result(`${found.length} muted`,'Muted state is read from Chrome tabs metadata.',found.map(t=>t.id));
  }
};

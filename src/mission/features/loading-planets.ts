import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'loading-planets', title: "Loading planets", group: 'Inspect',
  description: "Inspect browser tabs currently navigating",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.loading);return result(`${found.length} loading`,'Loading status comes from browser tab metadata.',found.map(t=>t.id));
  }
};

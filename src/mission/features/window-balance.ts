import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'window-balance', title: "Window balance", group: 'Explore',
  description: "Compare the smallest and largest browser windows",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const values=new Map<number,number>();for(const t of tabs)values.set(t.windowId,(values.get(t.windowId)||0)+1);const sizes=[...values.values()];const spread=sizes.length?Math.max(...sizes)-Math.min(...sizes):0;return result(`${spread} difference`,'Difference between busiest and quietest open windows.',tabs.map(t=>t.id));
  }
};

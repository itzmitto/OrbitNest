import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'sleeping-planets', title: "Sleeping planets", group: 'Inspect',
  description: "Find discarded or suspended browser tabs",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.discarded);return result(`${found.length} sleeping`,'Discarded tabs may be restored when activated by the browser.',found.map(t=>t.id));
  }
};

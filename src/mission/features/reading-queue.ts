import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'reading-queue', title: "Reading queue", group: 'Organize',
  description: "Find background pages suitable for later reading",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>!t.active&&!t.audible&&!t.pinned&&/^https?:/.test(t.url));return result(`${found.length} candidates`,'Non-active, unpinned and quiet web tabs only. No content is read.',found.map(t=>t.id));
  }
};

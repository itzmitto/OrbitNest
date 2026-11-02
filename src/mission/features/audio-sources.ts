import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'audio-sources', title: "Audio sources", group: 'Inspect',
  description: "Find tabs currently playing audible sound",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.audible&&!t.muted);return result(`${found.length} playing`,'Only tabs marked audible and not muted are highlighted.',found.map(t=>t.id));
  }
};

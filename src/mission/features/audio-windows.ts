import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'audio-windows', title: "Audio windows", group: 'Inspect',
  description: "Find browser windows with audible open tabs",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const ids=new Set(tabs.filter(t=>t.audible&&!t.muted).map(t=>t.windowId));return result(`${ids.size} windows`,'Windows containing at least one audible tab.',tabs.filter(t=>ids.has(t.windowId)).map(t=>t.id));
  }
};

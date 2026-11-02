import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'window-density', title: "Window density", group: 'Explore',
  description: "Find the browser window with most open tabs",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const counts=new Map<number,number>(); for(const tab of tabs)counts.set(tab.windowId,(counts.get(tab.windowId)||0)+1);const best=[...counts].sort((a,b)=>b[1]-a[1])[0];return result(best?`Window ${best[0]}`:'No windows',best?`${best[1]} tabs in the busiest window.`:'No browser windows available.',best?tabs.filter(t=>t.windowId===best[0]).map(t=>t.id):[]);
  }
};

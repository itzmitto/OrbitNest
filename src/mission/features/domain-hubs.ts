import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'domain-hubs', title: "Domain hubs", group: 'Explore',
  description: "Find the website that hosts the most open tabs",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const counts = new Map<string, number>(); for (const tab of tabs) counts.set(tab.domain,(counts.get(tab.domain)||0)+1); const ordered=[...counts].sort((a,b)=>b[1]-a[1]); const leader=ordered[0]; return result(leader?leader[0]:'None',leader?`${leader[1]} open tabs share this domain.`:'No tabs available.',leader?tabs.filter(t=>t.domain===leader[0]).map(t=>t.id):[]);
  }
};

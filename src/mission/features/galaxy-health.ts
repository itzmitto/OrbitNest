import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'galaxy-health', title: "Galaxy health", group: 'Explore',
  description: "Summarize tab count and duplicate URL overhead",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const urls=tabs.filter(t=>/^https?:/.test(t.url)).map(t=>t.url.split('#')[0]);const repeats=urls.length-new Set(urls).size;const score=Math.max(0,100-Math.max(0,tabs.length-40)-repeats*3);return result(`${score}/100 health`,'A simple local organization score: lower with many tabs and repeated URLs.',tabs.map(t=>t.id));
  }
};

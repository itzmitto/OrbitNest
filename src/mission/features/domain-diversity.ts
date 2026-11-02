import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'domain-diversity', title: "Domain diversity", group: 'Explore',
  description: "Measure variety across open website domains",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const count=new Set(tabs.map(t=>t.domain)).size;const ratio=tabs.length?Math.round(count/tabs.length*100):0;return result(`${ratio}% diverse`,`${count} unique domains across ${tabs.length} tabs.`,tabs.map(t=>t.id));
  }
};

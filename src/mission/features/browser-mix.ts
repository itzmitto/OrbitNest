import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'browser-mix', title: "Browser mix", group: 'Explore',
  description: "Identify browser-internal pages versus web pages",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.domain==='internal'||t.domain==='unknown');return result(`${found.length} internal`,'Internal pages do not expose ordinary web domains.',found.map(t=>t.id));
  }
};

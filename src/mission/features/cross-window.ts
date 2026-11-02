import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'cross-window', title: "Cross-window domains", group: 'Organize',
  description: "Find websites open in several browser windows",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const domains=new Map<string,Set<number>>();for(const t of tabs){const set=domains.get(t.domain)||new Set<number>();set.add(t.windowId);domains.set(t.domain,set);}const candidates=new Set([...domains].filter(([,v])=>v.size>1).map(([k])=>k));const found=tabs.filter(t=>candidates.has(t.domain));return result(`${candidates.size} domains`,'Websites appearing across separate windows are highlighted.',found.map(t=>t.id));
  }
};

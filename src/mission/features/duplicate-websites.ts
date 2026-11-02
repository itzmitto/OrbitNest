import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'duplicate-websites', title: "Duplicate websites", group: 'Organize',
  description: "Locate distinct tabs with exactly the same page URL",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const groups=new Map<string,TabInfo[]>();for(const tab of tabs){if(!/^https?:/.test(tab.url))continue;const key=tab.url.split('#')[0];groups.set(key,[...(groups.get(key)||[]),tab]);}const found=[...groups.values()].filter(g=>g.length>1).flat();return result(`${found.length} tabs`,'Repeated URLs remain separate browser tabs.',found.map(t=>t.id));
  }
};

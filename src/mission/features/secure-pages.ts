import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'secure-pages', title: "Secure pages", group: 'Inspect',
  description: "Show HTTPS pages without reading page bodies",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const found=tabs.filter(t=>t.url.startsWith('https://'));return result(`${found.length} secure`, 'HTTPS is inferred solely from the tab URL scheme.',found.map(t=>t.id));
  }
};

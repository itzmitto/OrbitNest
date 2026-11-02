import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'domain-families', title: "Domain families", group: 'Explore',
  description: "Group subdomains under a simplified parent domain",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    function base(d:string){const parts=d.split('.');return parts.length<=2?d:parts.slice(-2).join('.');}const groups=new Map<string,number>();for(const t of tabs)groups.set(base(t.domain),(groups.get(base(t.domain))||0)+1);const top=[...groups].sort((a,b)=>b[1]-a[1])[0];return result(top?.[0]||'No families',top?`${top[1]} tabs in the leading domain family.`:'No domain metadata found.',top?tabs.filter(t=>base(t.domain)===top[0]).map(t=>t.id):[]);
  }
};

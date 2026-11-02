import type { MissionContext, MissionFeature, FeatureResult, TabInfo } from '../model';
function result(value: string, description: string, focus: number[]): FeatureResult {return {value,description,focus};}
export const feature: MissionFeature = {
  id: 'focus-priority', title: "Focus priority", group: 'Organize',
  description: "Surface pinned, active and audible tabs together",
  evaluate(context: MissionContext): FeatureResult {
    const tabs: TabInfo[] = context.tabs;
    const ranked=tabs.map(t=>({tab:t,score:(t.active?5:0)+(t.pinned?3:0)+(t.audible&&!t.muted?2:0)})).sort((a,b)=>b.score-a.score);const high=ranked.filter(r=>r.score>0).slice(0,12);return result(`${high.length} priority`,'Highlights the 12 highest-scoring active, pinned or audible tabs.',high.map(v=>v.tab.id));
  }
};

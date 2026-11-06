import type {NovaTab} from './model.ts';
export interface FocusProposal {tab:NovaTab;score:number;reason:string;recommended:'keep'|'mute'|'review'}
export interface FocusSummary {open:number;noisy:number;unpinned:number;quiet:number;reviewed:number}
export function proposeFocus(tabs:NovaTab[]):FocusProposal[]{
 return tabs.map(tab=>{
  let score=0;const reasons:string[]=[];
  if(tab.active){score+=5;reasons.push('current tab')}
  if(tab.pinned){score+=4;reasons.push('pinned reference')}
  if(tab.audible&&!tab.muted){score-=3;reasons.push('playing audio')}
  if(tab.discarded){score-=2;reasons.push('unloaded background')}
  if(!tab.active&&!tab.pinned){score-=1;reasons.push('background tab')}
  return {tab,score,reason:reasons.join(' · ')||'regular tab',recommended:(tab.active||tab.pinned?'keep':tab.audible&&!tab.muted?'mute':'review') as FocusProposal['recommended']};
 }).sort((a,b)=>b.score-a.score||a.tab.index-b.tab.index);
}
export function focusSummary(tabs:NovaTab[]):FocusSummary{
 return {open:tabs.length,noisy:tabs.filter(tab=>tab.audible&&!tab.muted).length,
  unpinned:tabs.filter(tab=>!tab.pinned).length,quiet:tabs.filter(tab=>tab.muted).length,
  reviewed:tabs.filter(tab=>tab.discarded).length};
}
export function focusChecklist(tabs:NovaTab[]):string[]{
 const summary=focusSummary(tabs);const tasks:string[]=[];
 if(summary.noisy)tasks.push(`Review ${summary.noisy} audible tab${summary.noisy===1?'':'s'}`);
 if(summary.open>20)tasks.push('Consider saving a session snapshot before organizing the workspace');
 if(summary.unpinned>12)tasks.push('Pin your most important reference tabs');
 if(!tasks.length)tasks.push('Your browser looks calm. Continue your current task.');
 return tasks;
}

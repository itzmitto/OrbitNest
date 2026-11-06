import type {NovaPanel} from '../core/model.ts';
import {proposeFocus,focusSummary,focusChecklist} from '../core/focus.ts';
import {el,action} from '../components/dom.ts';
import {applyTabAction,hasLiveTabs} from '../../zenith/core/tabs.ts';
export const focusPanel:NovaPanel={id:'focus',title:'Focus mission',
 description:'A calm plan for your current tabs. Suggestions are informational until you choose an action.',
 render(host,context){
  const summary=focusSummary(context.tabs);const metrics=el('div','nova-grid');
  for(const [label,count] of [['PLAYING AUDIO',summary.noisy],['PINNED REFERENCES',summary.open-summary.unpinned],['QUIET WORLDS',summary.quiet]] as const){
   const tile=el('div','nova-tile');tile.append(el('span','nova-eyebrow',label),el('strong','',String(count)));metrics.append(tile);
  }
  const checklist=el('div','nova-checklist');checklist.append(el('h3','','Suggested next steps'));
  for(const task of focusChecklist(context.tabs))checklist.append(el('p','',`✓ ${task}`));
  const planets=el('div','nova-focus-planets');
  for(const proposal of proposeFocus(context.tabs).slice(0,30)){
   const row=el('div','nova-focus-row');const content=el('div');
   content.append(el('strong','',proposal.tab.title||proposal.tab.url),el('small','',proposal.reason));
   row.append(content,el('span','nova-focus-state',proposal.recommended.toUpperCase()));
   if(proposal.recommended==='mute'){
    const control=action('Mute this tab',async()=>{
     const result=hasLiveTabs()&&await applyTabAction(proposal.tab.id,'mute');
     context.notify(result?'Tab muted':'This action requires the Chrome extension');if(result)context.refresh();
    });control.disabled=!hasLiveTabs();row.append(control);
   }
   planets.append(row);
  }
  host.append(metrics,checklist,planets);
 }};

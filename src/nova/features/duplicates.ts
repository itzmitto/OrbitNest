import type {NovaPanel} from '../core/model.ts';
import {findDuplicateGroups,previewDuplicateCleanup} from '../core/duplicates.ts';
import {el,action,empty} from '../components/dom.ts';
import {hasLiveTabs,applyTabAction} from '../../zenith/core/tabs.ts';
export const duplicatesPanel:NovaPanel={id:'duplicates',title:'Duplicate orbit scanner',
 description:'Review identical tab URLs. Active and pinned tabs are never suggested for closing.',
 render(host,context){
  const groups=findDuplicateGroups(context.tabs);const summary=previewDuplicateCleanup(context.tabs);
  const intro=el('div','nova-alert');intro.append(el('strong','',`${summary.eligible} safe duplicate candidate${summary.eligible===1?'':'s'}`),
   el('p','','Nothing is closed automatically. Active and pinned tabs are protected.'));
  host.append(intro);
  if(!groups.length)host.append(empty('No duplicate web URLs detected in the current tab set.'));
  for(const group of groups){const item=el('section','nova-duplicate');
   item.append(el('h3','',group.keep.title||group.url),el('p','',group.url),el('small','',`Keep tab #${group.keep.id} · ${group.extras.length} close candidate(s)`));
   if(group.extras.length){const control=action(`Close ${group.extras.length} extra tab${group.extras.length===1?'':'s'}`,async()=>{
    if(!window.confirm(`Close ${group.extras.length} duplicate tabs for ${group.url}? This cannot be undone.`))return;
    let closed=0;for(const tab of group.extras){if(await applyTabAction(tab.id,'close'))closed++;}
    context.notify(`Closed ${closed} duplicate tab${closed===1?'':'s'}.`);context.refresh();
   },'nova-button nova-danger');control.disabled=!hasLiveTabs();item.append(control);}
   host.append(item);
  }
 }};

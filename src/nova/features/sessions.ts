import type {NovaPanel} from '../core/model.ts';
import {loadOrbits,saveOrbits,safeBookmarks,type SavedOrbit} from '../core/storage.ts';
import {previewRestore,restoreBookmarks} from '../core/restore.ts';
import {el,action,empty} from '../components/dom.ts';
import {mountTransfer} from '../components/transfer.ts';
export const sessionsPanel:NovaPanel={
 id:'sessions',title:'Session vault',description:'Save your open planet constellation and inspect it before restoring.',
 render(host,context){
  const toolbar=el('div','nova-inline');const name=el('input','nova-input');name.placeholder='Name this browser session';name.maxLength=80;name.setAttribute('aria-label','Session name');
  const list=el('div','nova-session-list');
  function persist(value:SavedOrbit[]){if(!saveOrbits(value))context.notify('Browser storage is unavailable');draw();}
  function draw(){list.replaceChildren();const saved=loadOrbits();if(!saved.length)list.append(empty('Your session vault is empty. Save a constellation to begin.'));
   for(const orbit of saved){const row=el('section','nova-session');const details=el('div');details.append(el('strong','',orbit.name),el('small','',`${orbit.tabs.length} safe web tabs · ${orbit.createdAt}`));
    const actions=el('div','nova-inline');const preview=previewRestore(orbit,context.tabs.map(t=>t.url));
    actions.append(action(`Restore ${preview.requests}`,async()=>{
     if(!preview.requests){context.notify('All session tabs are already open.');return;}
     const answer=window.confirm(`Open ${preview.requests} tabs from “${orbit.name}”? Existing tabs will stay open.`);
     if(!answer)return;
     const result=await restoreBookmarks(preview.safe);
     context.notify(`Restored ${result.created} tabs${result.failed?`; ${result.failed} could not be opened`:''}.`);context.refresh();
    }),action('Delete',()=>{
     if(!window.confirm(`Delete the saved session “${orbit.name}”?`))return;
     persist(saved.filter(item=>item.id!==orbit.id));
    },'nova-button nova-danger'));
    row.append(details,actions);list.append(row);
   }
  }
  toolbar.append(name,action('Save current constellation',()=>{
   const bookmarks=safeBookmarks(context.tabs);if(!bookmarks.length){context.notify('No web tabs are available for a snapshot.');return;}
   const newOrbit:SavedOrbit={id:crypto.randomUUID(),name:name.value.trim()||`Session ${new Date().toLocaleDateString()}`,createdAt:new Date().toLocaleString(),tabs:bookmarks};
   persist([newOrbit,...loadOrbits()].slice(0,30));name.value='';
  },'nova-button nova-button-accent'));
  host.append(toolbar,list);mountTransfer(host,draw,context.notify);draw();
 }};

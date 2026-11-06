import {exportSessionBundle,importSessionBundle,mergeSessionBundles} from '../core/transfer.ts';
import {loadOrbits,saveOrbits} from '../core/storage.ts';
import {el,action} from './dom.ts';
export function mountTransfer(host:HTMLElement,onUpdate:()=>void,onMessage:(message:string)=>void):void{
 const card=el('section','nova-transfer');card.append(el('h3','','Backup and move your constellations'),
  el('p','','Export local sessions as JSON, or import a trusted file after reviewing its contents.'));
 const actions=el('div','nova-inline');
 actions.append(action('Export session archive',()=>{
  const content=exportSessionBundle(loadOrbits());
  const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=`orbitnest-nova-sessions-${new Date().toISOString().slice(0,10)}.json`;link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
 }));
 const importButton=action('Import a JSON archive',()=>picker.click());
 const picker=el('input');picker.type='file';picker.accept='.json,application/json';picker.hidden=true;
 picker.addEventListener('change',async()=>{
  const file=picker.files?.[0];if(!file)return;
  try{
   if(file.size>2_000_000)throw Error('Archive exceeds 2 MB');
   const incoming=importSessionBundle(await file.text());
   const count=incoming.reduce((sum,orbit)=>sum+orbit.tabs.length,0);
   if(!window.confirm(`Import ${incoming.length} sessions containing ${count} web tabs? Existing sessions will be preserved.`))return;
   if(!saveOrbits(mergeSessionBundles(loadOrbits(),incoming)))throw Error('Browser storage is unavailable');
   onMessage(`Imported ${incoming.length} sessions`);onUpdate();
  }catch(error){onMessage(error instanceof Error?error.message:'Could not read the archive')}
  finally{picker.value='';}
 });
 actions.append(importButton,picker);card.append(actions);host.append(card);
}

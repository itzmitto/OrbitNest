import {setContent,toast} from '../ui/shell';
import {getTabs,hasLiveTabs} from '../core/tabs';
import {captureSession,getSessions,saveSession,deleteSession,restoreSession,exportSessions,importSessions} from '../core/sessions';
import {escapeHTML} from '../core/math';
export async function mountSessions():Promise<()=>void>{
 const target=setContent(`<div class="z-grid"><section class="z-card"><div class="z-card__title"><h2>SAVE A CONSTELLATION</h2><small>LOCAL SNAPSHOTS</small></div>
 <div class="z-form"><label>SESSION NAME <input id="z-session-name" maxlength="70" placeholder="My creative workspace"></label><p class="z-muted">Only HTTP/HTTPS tab URLs are saved on this device. No page content is collected.</p><button class="z-btn z-btn--primary" id="z-save-session">Save current planets</button></div></section>
 <section class="z-card"><div class="z-card__title"><h2>BACKUP YOUR GALAXIES</h2><small>JSON EXPORT / IMPORT</small></div><div class="z-form"><button class="z-btn" id="z-export">Export saved sessions</button><label>Import JSON backup <input type="file" id="z-import" accept="application/json,.json"/></label></div></section></div>
 <section class="z-card z-section"><div class="z-card__title"><h2>SAVED CONSTELLATIONS</h2><small>RESTORE ONLY WHEN REQUESTED</small></div><div id="z-session-list" class="z-collection" style="padding:22px"></div></section>`);
 const render=()=>{target.querySelector<HTMLElement>('#z-session-list')!.innerHTML=getSessions().map(s=>`<article class="z-card z-collection-card"><i class="z-dot"></i><strong>${escapeHTML(s.name)}</strong><small>${s.tabs.length} planets · ${escapeHTML(new Date(s.createdAt).toLocaleDateString())}</small><div class="z-actions" style="margin-top:15px"><button class="z-btn z-btn--primary" data-restore="${escapeHTML(s.id)}">Restore</button><button class="z-btn" data-delete="${escapeHTML(s.id)}">Delete</button></div></article>`).join('')||'<div class="z-empty">No sessions saved. Capture your current tabs to start a collection.</div>';};
 target.querySelector<HTMLButtonElement>('#z-save-session')!.onclick=async()=>{const tabs=await getTabs(),name=target.querySelector<HTMLInputElement>('#z-session-name')!.value;
 const session=captureSession(tabs,name);if(!session.tabs.length){toast('No regular web tabs found to save.');return;}saveSession(session);toast(`Saved ${session.tabs.length} planets`);render();};
 target.querySelector<HTMLButtonElement>('#z-export')!.onclick=()=>{const blob=new Blob([exportSessions()],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='orbitnest-sessions.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 target.querySelector<HTMLInputElement>('#z-import')!.onchange=async e=>{const file=(e.target as HTMLInputElement).files?.[0];if(!file||file.size>1024*1024){toast('Select a JSON backup under 1 MB.');return;}
 const count=importSessions(await file.text());toast(`${count} valid sessions imported`);render();};
 target.addEventListener('click',async e=>{const restore=(e.target as HTMLElement).closest<HTMLElement>('[data-restore]'),remove=(e.target as HTMLElement).closest<HTMLElement>('[data-delete]');
 if(restore){const session=getSessions().find(s=>s.id===restore.dataset.restore);if(session&&hasLiveTabs()&&confirm(`Open ${session.tabs.length} tabs from ${session.name}?`)){const count=await restoreSession(session);toast(`Restored ${count} planets`);}else if(!hasLiveTabs())toast('Restoring tabs requires the installed extension.');}
 if(remove&&confirm('Delete this saved constellation?')){deleteSession(remove.dataset.delete||'');render();}});
 render();return ()=>{};
}

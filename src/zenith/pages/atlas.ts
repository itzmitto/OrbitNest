import {setContent,stat} from '../ui/shell.ts';
import {getTabs} from '../core/tabs.ts';
import {groupDomainCounts} from '../core/scene.ts';
import {formatHost,escapeHTML} from '../core/math.ts';
import {safeTitle,windowsCount} from '../core/utils.ts';
import {getCollections,addCollection,removeCollection} from '../core/collections.ts';
const swatches=['#8f83ff','#60d7d0','#f6b769','#e78cbc','#8ea9ff','#a5e8b1'];
export async function mountAtlas():Promise<()=>void>{
 const tabs=await getTabs(),domains=groupDomainCounts(tabs);
 const target=setContent(`<div class="z-stats">${stat('Domains',domains.length,'DISTINCT STAR SYSTEMS')}${stat('Planets',tabs.length,'OPEN BROWSER TABS')}${stat('Windows',windowsCount(tabs),'WORKSPACE GALAXIES')}${stat('Largest cluster',domains[0]?.count||0,'RELATED TAB WORLDS')}</div>
 <div class="z-card"><div class="z-card__title"><h2>DISCOVER YOUR GALAXY</h2><small>GROUPED BY DOMAIN</small></div><div class="z-controls"><label>FILTER <input id="z-domain-filter" type="search" placeholder="Search star systems..."></label><label>SORT <select id="z-domain-sort"><option value="count">Most planets</option><option value="name">Alphabetically</option></select></label></div><div id="z-domain-grid" class="z-collection" style="padding:22px"></div></div>
 <section class="z-card z-section"><div class="z-card__title"><h2>FAVORITE CONSTELLATIONS</h2></div><div class="z-form"><label>COLLECTION NAME <input id="z-collection-name" placeholder="Design references"></label><button class="z-btn" id="z-collection-save">Save selected star system</button><div id="z-collections" class="z-list"></div></div></section><section class="z-card z-section"><div class="z-card__title"><h2>STAR SYSTEM CONTENTS</h2><small id="z-atlas-heading">SELECT A SYSTEM</small></div><div class="z-list" id="z-atlas-tabs"><div class="z-empty">Choose a galaxy above to inspect its orbiting tabs.</div></div></section>`);
 let filter='',sort='count';let active:string|null=null;
 const renderTabs=()=>{const element=target.querySelector<HTMLElement>('#z-atlas-tabs')!;const related=tabs.filter(t=>formatHost(t.url)===active);
 element.innerHTML=related.map(t=>`<div class="z-list-row"><i class="z-dot"></i><span><strong>${safeTitle(t)}</strong><small>Window ${t.windowId} · ${t.pinned?'Pinned':'Regular'} · ${t.audible?'Audio':'Silent'}</small></span></div>`).join('')||'<div class="z-empty">Choose a star system.</div>';
 target.querySelector<HTMLElement>('#z-atlas-heading')!.textContent=active||'SELECT A SYSTEM';};
 const draw=()=>{const shown=domains.filter(d=>d.name.toLowerCase().includes(filter.toLowerCase()));shown.sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):b.count-a.count||a.name.localeCompare(b.name));
 target.querySelector<HTMLElement>('#z-domain-grid')!.innerHTML=shown.map((d,i)=>`<button class="z-card z-collection-card" data-domain="${escapeHTML(d.name)}" aria-pressed="${active===d.name}" style="text-align:left;color:inherit"><i class="z-dot" style="background:${swatches[i%swatches.length]}"></i><strong>${escapeHTML(d.name)}</strong><small>${d.count} ${d.count===1?'planet':'planets'} orbit this star system</small></button>`).join('')||'<div class="z-empty">No star systems match that search.</div>';};
 target.querySelector<HTMLInputElement>('#z-domain-filter')!.oninput=e=>{filter=(e.target as HTMLInputElement).value;draw();};
 target.querySelector<HTMLSelectElement>('#z-domain-sort')!.onchange=e=>{sort=(e.target as HTMLSelectElement).value;draw();};
 target.addEventListener('click',e=>{const el=(e.target as HTMLElement).closest<HTMLElement>('[data-domain]');if(el){active=el.dataset.domain||null;draw();renderTabs();}});
 const collections=()=>{target.querySelector<HTMLElement>('#z-collections')!.innerHTML=getCollections().map(collection=>`<div class="z-list-row"><span><strong>${escapeHTML(collection.name)}</strong><small>${collection.domains.map(escapeHTML).join(', ')}</small></span><button class="z-btn" data-remove-collection="${collection.id}">Remove</button></div>`).join('')||'<p class="z-muted">Save a star system to build a personal collection.</p>';};
 target.querySelector<HTMLButtonElement>('#z-collection-save')!.onclick=()=>{if(!active){toast('Choose a star system first');return;}addCollection(target.querySelector<HTMLInputElement>('#z-collection-name')!.value,[active]);collections();toast('Collection saved locally');};
 target.addEventListener('click',e=>{const button=(e.target as HTMLElement).closest<HTMLElement>('[data-remove-collection]');if(button){removeCollection(button.dataset.removeCollection||'');collections();}});
 draw();collections();return ()=>{};
}

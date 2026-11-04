import {setContent,stat,toast} from '../ui/shell.ts';
import {UniverseScene} from '../ui/scene.ts';
import {getTabs,hasLiveTabs,applyTabAction} from '../core/tabs.ts';
import {filterTabs,uniqueDomains,windowsCount,safeTitle} from '../core/utils.ts';
import {formatHost,escapeHTML} from '../core/math.ts';
import type {BrowserTab,Planet} from '../core/types.ts';
import {getPreferences} from '../core/state.ts';
import {formations,getFormation,lenses,getLens} from '../core/data.ts';
let scene:UniverseScene|null=null;
let current:BrowserTab[]=[];let selected:Planet|null=null;let query='';let formation='solar-spiral',lens='all';let timer:ReturnType<typeof setInterval>|undefined;
function selectedPanel():string{
 const tab=selected?.tab;if(!tab)return `<div class="z-planet-emblem"><div class="z-planet-orb"></div></div><h3>Select a planet</h3><p class="z-muted">Click any planet to explore its tab, domain, window and actions.</p>`;
 return `<div class="z-planet-emblem"><div class="z-planet-orb" style="filter:hue-rotate(${Math.round(selected!.hue*360)}deg)"></div></div>
 <h3 class="z-inspector-title">${safeTitle(tab)}</h3><p class="z-muted">${escapeHTML(formatHost(tab.url))}</p>
 <div class="z-info">Window <strong>${tab.windowId}</strong></div>
 <div class="z-info">Pinned <strong>${tab.pinned?'YES':'NO'}</strong></div>
 <div class="z-info">Audio <strong>${tab.audible?'PLAYING':'SILENT'}</strong></div>
 <div class="z-actions"><button class="z-btn z-btn--primary" data-action="open">Open tab</button><button class="z-btn" data-action="${tab.pinned?'unpin':'pin'}">${tab.pinned?'Unpin':'Pin'} tab</button><button class="z-btn" data-action="${tab.muted?'unmute':'mute'}">${tab.muted?'Unmute':'Mute'}</button></div>`;
}
function updatePanel():void{const el=document.getElementById('z-selected');if(el)el.innerHTML=selectedPanel();}
async function refresh():Promise<void>{current=await getTabs();const visible=getLens(lens).select(filterTabs(current,query));
 scene?.setTabs(visible,getFormation(formation));if(selected&&!visible.some(t=>t.id===selected?.tab.id))selected=null;
 const counters=document.getElementById('z-counters');if(counters)counters.innerHTML=stat('Open planets',current.length,'LIVE BROWSER TABS')+stat('Star systems',uniqueDomains(current),'UNIQUE DOMAINS')+stat('Windows',windowsCount(current),'ACTIVE WORKSPACES')+stat('Audio worlds',current.filter(t=>t.audible).length,'PLAYING MEDIA');
 const list=document.getElementById('z-live-list');if(list)list.innerHTML=visible.slice(0,12).map(t=>`<button class="z-list-row" data-tab="${t.id}"><i class="z-dot" style="--hue:${(t.id*17)%360}"></i><span><strong>${safeTitle(t)}</strong><small>${escapeHTML(formatHost(t.url))}</small></span>↗</button>`).join('')||'<div class="z-empty">No tabs match your search.</div>';
 updatePanel();const status=document.getElementById('z-connection');if(status)status.textContent=hasLiveTabs()?'● CONNECTED':'○ DEMO PLANETS';
}
export async function mountPlanetarium():Promise<()=>void>{
 const prefs=getPreferences();document.documentElement.dataset.theme=prefs.theme;
 const target=setContent(`<div id="z-counters" class="z-stats"></div><div class="z-grid"><div class="z-stack">
 <section class="z-card"><div class="z-card__title"><h2>LIVE SOLAR SYSTEM</h2><small>WebGL2 · Real sphere geometry</small></div>
 <div class="z-scene"><canvas id="z-planet-canvas" aria-label="Interactive 3D representation of open browser tabs"></canvas>
 <div class="z-scene-overlay"><div><span class="z-scene-tag">YOUR BROWSER AS A UNIVERSE</span><div class="z-scene-heading">Orbit around ideas.</div></div></div>
 <div class="z-scene-bottom"><span class="z-pill">DRAG TO ROTATE · SCROLL TO ZOOM · CLICK TO SELECT</span><span class="z-pill" id="z-fps">WEBGL2</span></div></div>
 <div class="z-controls"><label>SEARCH <input id="z-search" type="search" placeholder="Find a planet..." aria-label="Search tabs"></label>
 <label>FORMATION <select id="z-formation"></select></label><label>LENS <select id="z-lens"></select></label><button class="z-btn" id="z-fit">Fit all</button><button class="z-btn" id="z-pause">Pause motion</button><button class="z-btn" id="z-refresh">Refresh</button></div></section>
 <section class="z-card"><div class="z-card__title"><h2>EXPLORE TAB PLANETS</h2><small>CLICK TO INSPECT</small></div><div class="z-list" id="z-live-list"></div></section>
 </div><div class="z-stack"><section class="z-card"><div class="z-card__title"><h2>PLANET INSPECTOR</h2><small>DETAILS</small></div><div class="z-inspector" id="z-selected"></div></section>
 <section class="z-card"><div class="z-card__title"><h2>YOUR NEXT DESTINATION</h2></div><div class="z-list"><a class="z-list-row" href="./atlas.html"><span><strong>Galaxy Atlas</strong><small>Organize your domains and constellations</small></span>↗</a><a class="z-list-row" href="./observatory.html"><span><strong>Observatory</strong><small>Understand your workspace signals</small></span>↗</a><a class="z-list-row" href="./sessions.html"><span><strong>Sessions</strong><small>Save and restore your tab constellations</small></span>↗</a></div></section></div></div>`);
 const formationBox=target.querySelector<HTMLSelectElement>('#z-formation')!,lensBox=target.querySelector<HTMLSelectElement>('#z-lens')!;
 for(const f of formations)formationBox.add(new Option(f.label,f.id));for(const l of lenses)lensBox.add(new Option(l.label,l.id));
 formationBox.onchange=()=>{formation=formationBox.value;void refresh();};lensBox.onchange=()=>{lens=lensBox.value;void refresh();};
 const canvas=target.querySelector<HTMLCanvasElement>('#z-planet-canvas')!;
 scene=new UniverseScene(canvas,{onSelect:planet=>{selected=planet;updatePanel();},onFrame:fps=>{const el=document.getElementById('z-fps');if(el)el.textContent=`${Math.round(fps)} FPS · WEBGL2`;}});
 target.querySelector<HTMLInputElement>('#z-search')!.oninput=e=>{query=(e.target as HTMLInputElement).value;void refresh();};
 target.querySelector<HTMLButtonElement>('#z-fit')!.onclick=()=>scene?.fit();
 target.querySelector<HTMLButtonElement>('#z-pause')!.onclick=e=>{const playing=scene?.pause();(e.currentTarget as HTMLButtonElement).textContent=playing?'Pause motion':'Resume motion';};
 target.querySelector<HTMLButtonElement>('#z-refresh')!.onclick=()=>void refresh();
 target.addEventListener('click',e=>{const control=(e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]');if(control&&selected){const action=control.dataset.action as 'open'|'pin'|'unpin'|'mute'|'unmute';void applyTabAction(selected.tab.id,action).then(ok=>{toast(ok?'Tab updated':'Action unavailable in preview');void refresh();});}
 const row=(e.target as HTMLElement).closest<HTMLElement>('[data-tab]');if(row){const id=Number(row.dataset.tab);const planet=scene?.getPlanets().find(p=>p.tab.id===id);if(planet){selected=planet;scene?.setSelection(planet.id);updatePanel();}}});
 await refresh();timer=setInterval(()=>{if(!document.hidden)void refresh();},12000);
 return ()=>{if(timer)clearInterval(timer);scene?.dispose();scene=null;};
}

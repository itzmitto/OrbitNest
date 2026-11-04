import {setContent,stat,toast} from '../ui/shell.ts';
import {getTabs,hasLiveTabs,applyTabAction} from '../core/tabs.ts';
import {safeTitle,uniqueDomains} from '../core/utils.ts';
import {formatHost,escapeHTML} from '../core/math.ts';
import type {BrowserTab} from '../core/types.ts';
import {diagnose,healthMessage} from '../core/diagnostics.ts';
function duplicates(tabs:BrowserTab[]):BrowserTab[]{const visited=new Set<string>(),result:BrowserTab[]=[];
 for(const tab of tabs){const key=tab.url.split('#')[0];if(!/^https?:\/\//.test(key))continue;if(visited.has(key))result.push(tab);else visited.add(key);}return result;}
export async function mountMissionControl():Promise<()=>void>{
 const tabs=await getTabs(),dupes=duplicates(tabs),muted=tabs.filter(t=>t.muted),pinned=tabs.filter(t=>t.pinned),health=diagnose(tabs);
 const target=setContent(`<div class="z-stats">${stat('Duplicate orbits',dupes.length,'POTENTIAL CLEANUP')}${stat('Pinned worlds',pinned.length,'STABLE REFERENCE')}${stat('Muted tabs',muted.length,'SILENT SPACE')}${stat('Domain systems',uniqueDomains(tabs),'BROWSER GALAXY')}</div>
 <div class="z-grid"><section class="z-card"><div class="z-card__title"><h2>DUPLICATE PLANET SCANNER</h2><small>REVIEW BEFORE CLOSING</small></div><div class="z-list" id="z-dupes"></div><div class="z-controls"><button class="z-btn z-btn--primary" id="z-clear-dupes" ${dupes.length?'':'disabled'}>Close duplicates after confirmation</button></div></section>
 <section class="z-card"><div class="z-card__title"><h2>PINNED CONSTELLATIONS</h2><small>LONG-TERM SHORTCUTS</small></div><div class="z-list" id="z-pinned"></div></section></div>
 <section class="z-card z-section"><div class="z-card__title"><h2>MISSION GUIDELINES</h2></div><div class="z-form"><p class="z-muted">${healthMessage(health)}</p><p class="z-muted">Tab operations happen only after explicit user interaction. Internal pages, extensions and browser settings are not included in the duplicate cleaner.</p><p class="z-muted">Tabs are never uploaded or transmitted to an external service. Session storage remains local.</p></div></section>`);
 const markup=(t:BrowserTab)=>`<div class="z-list-row"><i class="z-dot"></i><span><strong>${safeTitle(t)}</strong><small>${escapeHTML(formatHost(t.url))} · Window ${t.windowId}</small></span></div>`;
 target.querySelector<HTMLElement>('#z-dupes')!.innerHTML=dupes.map(markup).join('')||'<div class="z-empty">No duplicate tabs detected.</div>';
 target.querySelector<HTMLElement>('#z-pinned')!.innerHTML=pinned.map(markup).join('')||'<div class="z-empty">Pin important planets for easy access.</div>';
 target.querySelector<HTMLButtonElement>('#z-clear-dupes')!.onclick=async()=>{if(!hasLiveTabs()){toast('Cleanup is unavailable in preview mode.');return;}
 if(!confirm(`Close ${dupes.length} duplicate tabs? This cannot be undone.`))return;
 let removed=0;for(const tab of dupes){if(await applyTabAction(tab.id,'close'))removed++;}
 toast(`Closed ${removed} duplicate tabs.`);};
 return ()=>{};
}

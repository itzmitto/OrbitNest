import './styles/main.css';
import {applyTabAction,hasLiveTabs} from '../zenith/core/tabs.ts';
import type {NovaTab,PanelContext} from './core/model.ts';
import {clusterTabs,tabStats} from './core/model.ts';
import {createShell,renderStats} from './components/shell.ts';
import {mountPlanetarium,type PlanetariumHandle} from './components/planetarium.ts';
import {el,action,empty,shortText} from './components/dom.ts';
import {findNovaPanel} from './features/registry.ts';
import {applyNovaSettings,getCurrentSettings} from './core/theme.ts';

export function mountNova(host: HTMLElement, inputTabs: NovaTab[], notify: (message: string) => void, refresh: () => void): () => void {
 let tabs=[...inputTabs];let selectedPage=decodeURIComponent(location.hash.split('/')[1]||'universe');
 let disposed=false;let scene:PlanetariumHandle|null=null;let panelDispose:(()=>void)|void;
 const shell=createShell(host,openPage);
 applyNovaSettings(shell.root,getCurrentSettings());
 const controls=shell.root.querySelector<HTMLElement>('#nova-scene-controls');
 if(!controls)throw Error('Nova toolbar unavailable');
 const context:PanelContext={get tabs(){return tabs;},refresh,notify,go:openPage,
  open:async id=>{
   if(!hasLiveTabs()){notify('Live tab actions are available only inside Chrome extension.');return false;}
   const success=await applyTabAction(id,'open');
   if(success)refresh();else notify('Unable to activate this tab.');
   return success;
  }};
 function updateSystems(){
  const container=shell.root.querySelector<HTMLElement>('.nova-system-list');if(!container)return;
  const systems=clusterTabs(tabs).slice(0,6);container.replaceChildren();
  const card=el('section','nova-card nova-panel');card.append(el('h2','','Nearby star systems'));
  if(!systems.length)card.append(empty('No domains in the current view.'));
  for(const item of systems){const row=el('div','nova-system-row');
   const orb=el('span','nova-system-orb');orb.style.setProperty('--planet-tone',`hsl(${item.hue} 72% 57%)`);
   const body=el('div');body.append(el('strong','',shortText(item.host,35)),el('small','',`${item.count} open planet${item.count===1?'':'s'}`));
   row.append(orb,body);card.append(row);
  }container.append(card);
 }
 function openPage(page:string){
  if(disposed)return;
  selectedPage=page;panelDispose?.();panelDispose=undefined;
  const target=shell.content;target.replaceChildren();
  const buttons=shell.menu.querySelectorAll<HTMLButtonElement>('[data-page]');
  buttons.forEach(button=>button.dataset.active=String(button.dataset.page===page));
  const url=new URL(location.href);url.hash=page==='universe'?'nova':`nova/${encodeURIComponent(page)}`;
  history.replaceState(null,'',url);
  if(page==='universe'){
   const card=el('section','nova-card nova-panel');card.append(el('h2','','Explore your live tab galaxy'));
   card.append(el('p','','Select a planet in the 3D viewport, or explore one of the tools from the sidebar. No browsing data leaves your computer.'));
   const grid=el('div','nova-grid');
   for(const item of clusterTabs(tabs).slice(0,8)){
    const tile=el('div','nova-tile');tile.append(el('span','nova-eyebrow',`${item.count} PLANET${item.count===1?'':'S'}`),el('strong','',item.host));grid.append(tile);
   }card.append(grid,action('EXPLORE STAR SYSTEMS',()=>openPage('systems'),'nova-button nova-button-accent'));target.append(card);return;
  }
  const panel=findNovaPanel(page);
  if(!panel){target.append(empty('This navigation panel is not part of the installed version.'));return;}
  const card=el('section','nova-card nova-panel');card.append(el('span','nova-eyebrow','NOVA MISSION SYSTEM'),el('h2','',panel.title),el('p','',panel.description));
  const body=el('div','nova-feature-body');card.append(body);target.append(card);
  panelDispose=panel.render(body,context);
 }
 try {scene=mountPlanetarium(shell.stage,controls,shell.inspector,id=>{void context.open(id);});scene.update(tabs);}
 catch(error){console.error('Nova planet renderer failed to start',error);shell.stage.append(empty('3D renderer unavailable. Check hardware acceleration or browser WebGL settings.'));}
 shell.status.textContent=hasLiveTabs()?'LIVE CHROME TABS':'PREVIEW MODE';
 shell.search.addEventListener('input',()=>{
  const query=shell.search.value.toLowerCase().trim();tabs=inputTabs.filter(tab=>`${tab.title} ${tab.url}`.toLowerCase().includes(query));
  renderStats(shell.root.querySelector<HTMLElement>('#nova-stats')!,tabStats(tabs));
  scene?.update(tabs);updateSystems();openPage(selectedPage);
 });
 renderStats(shell.root.querySelector<HTMLElement>('#nova-stats')!,tabStats(tabs));updateSystems();openPage(selectedPage);
 const onShortcut=(event:KeyboardEvent)=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openPage('commands');}
  else if(event.key==='Escape'&&selectedPage==='commands'){openPage('universe');}
 };
 document.addEventListener('keydown',onShortcut);
 return ()=>{document.removeEventListener('keydown',onShortcut);disposed=true;panelDispose?.();scene?.dispose();scene=null;};
}

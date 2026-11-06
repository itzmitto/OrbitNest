import './styles/main.css';
import {mountNova} from '../nova/main.ts';
import {getTabs,hasLiveTabs,applyTabAction} from '../zenith/core/tabs.ts';
import {formations} from '../zenith/core/data.ts';
import type {BrowserTab,Planet} from '../zenith/core/types.ts';
import {AetherCockpit} from './ui/scene.ts';
import {features,getFeature} from './registry.ts';
import {host,safeTitle,countBy,topEntries} from './core/helpers.ts';
import {loadPreferences,savePreferences,type AetherPreferences} from './core/preferences.ts';
import type {AetherFeature,AetherReport,AetherView} from './core/types.ts';

const root=document.getElementById('aether-root');if(!root)throw Error('Aether root not found');
let tabs:BrowserTab[]=[];let cockpit:AetherCockpit|null=null;let selected:Planet|null=null;
let novaDispose:(()=>void)|null=null;
let preferences:AetherPreferences=loadPreferences();let currentView:AetherView='planetarium';let filter='';let paused=false;
const isAlive=()=>Boolean(document.getElementById('aether-root'));
function toast(message:string){document.querySelector('.aether-toast')?.remove();const notice=document.createElement('div');notice.className='aether-toast';notice.role='status';notice.textContent=message;document.body.append(notice);setTimeout(()=>notice.remove(),3600);}
function text(tag:string,value:string,className?:string):HTMLElement{const element=document.createElement(tag);element.textContent=value;if(className)element.className=className;return element;}
function clear(node:Element){node.replaceChildren();}
function button(label:string,handler:()=>void,variant=''):HTMLButtonElement{const node=document.createElement('button');node.type='button';node.className=`aether-button ${variant}`;node.textContent=label;node.onclick=handler;return node;}
function element(id:string):HTMLElement{const found=document.getElementById(id);if(!found)throw Error(`Aether element ${id} missing`);return found;}
function navigate(view:AetherView,feature?:string){
 const url=new URL(location.href);url.hash=feature?`${view}/${encodeURIComponent(feature)}`:view;
 history.replaceState(null,'',url);currentView=view;mountView(feature);
}
function shell(){
 root!.innerHTML=`<div class="aether-app"><aside class="aether-side"><a class="aether-logo" href="./aether.html"><span class="aether-logo-mark" aria-hidden="true"></span><span>OrbitNest<small>AETHER EDITION</small></span></a>
 <div class="aether-nav-label">EXPLORE YOUR GALAXY</div><nav class="aether-nav" aria-label="Main navigation">
 <button type="button" data-view="nova"><span class="aether-symbol">✦</span>Nova 3D cockpit</button>
 <button type="button" data-view="planetarium"><span class="aether-symbol">◎</span>Planetarium</button>
 <button type="button" data-view="instruments"><span class="aether-symbol">⌘</span>Mission instruments</button>
 <button type="button" data-view="observatory"><span class="aether-symbol">◈</span>Observatory</button>
 <button type="button" data-view="preferences"><span class="aether-symbol">⚙</span>Preferences</button></nav>
 <div class="aether-side-footer"><strong>LOCAL BY DESIGN</strong>Your browser tabs become planetary worlds. Your workspace information stays in your browser. <a href="./planetarium.html">Previous Zenith view</a></div></aside>
 <div class="aether-main"><header class="aether-top"><span class="aether-breadcrumb">ORBITNEST / <strong id="aether-current">PLANETARIUM</strong></span>
 <span class="aether-online" id="aether-live">CONNECTING</span></header>
 <section class="aether-hero"><div><span class="aether-kicker">EXPLORE THE SPACE BETWEEN YOUR IDEAS</span><h1 id="aether-title">Your universe, alive.</h1><p id="aether-subtitle">A 3D home for your tabs, tools and ideas. Every planet is a place to explore.</p></div><span class="aether-chip">✧ AETHER / VERSION 1.0</span></section>
 <div id="aether-content"></div></div></div>`;
 root!.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(link=>link.onclick=()=>navigate(link.dataset.view as AetherView));
}
function setHeading(title:string,subtitle:string){element('aether-title').textContent=title;element('aether-subtitle').textContent=subtitle;element('aether-current').textContent=currentView.toUpperCase();
 root!.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(link=>link.dataset.current=String(link.dataset.view===currentView));
}
function disposeScene(){cockpit?.dispose();cockpit=null;selected=null;novaDispose?.();novaDispose=null;}
function statGrid():HTMLElement{const metrics=[['OPEN PLANETS',tabs.length,'CURRENT BROWSER TABS'],['STAR SYSTEMS',countBy(tabs,t=>host(t.url)).size,'DISTINCT DOMAINS'],
 ['WORKSPACES',countBy(tabs,t=>String(t.windowId)).size,'BROWSER WINDOWS'],['AUDIO PLANETS',tabs.filter(t=>t.audible).length,'PLAYING SOUND']];
 const grid=text('div','','aether-stats');for(const [label,value,caption] of metrics){const card=text('div','','aether-stat');card.append(text('small',String(label)),text('strong',String(value)),text('em',String(caption)));grid.append(card);}return grid;}
function inspector(container:HTMLElement,planet:Planet|null){clear(container);
 container.append(text('div','','aether-orb'));
 if(!planet){container.append(text('h3','Choose a planet'),text('p','Click any world to view its tab, status and actions.'));return;}
 const tab=planet.tab;container.append(text('h3',safeTitle(tab)),text('p',host(tab.url)));
 for(const [label,value] of [['Window',String(tab.windowId)],['Pinned',tab.pinned?'YES':'NO'],['Audio',tab.audible?'PLAYING':'SILENT'],['URL',tab.url.length>52?tab.url.slice(0,49)+'…':tab.url]]){
  const row=text('div','','aether-info-row');row.append(text('span',label),text('strong',value));container.append(row);}
 const actions=text('div','','aether-toolbar');
 for(const [action,label] of [['open','Open tab'],[tab.pinned?'unpin':'pin',tab.pinned?'Unpin':'Pin'],[tab.muted?'unmute':'mute',tab.muted?'Unmute':'Mute']]){
  const ctrl=button(label,()=>{void applyTabAction(tab.id,action as 'open'|'pin'|'unpin'|'mute'|'unmute').then(ok=>{toast(ok?'Browser tab updated':'This action needs the extension context');void updateTabs();});});
  ctrl.disabled=!hasLiveTabs();actions.append(ctrl);
 }container.append(actions);
}
function mountPlanetarium(){
 setHeading('Your universe, alive.','Every tab is a world. Orbit around ideas, explore domains and navigate a galaxy that belongs to you.');
 const content=element('aether-content');content.innerHTML=`<div id="aether-stats"></div><div class="aether-layout"><div class="aether-stack"><section class="aether-card">
 <div class="aether-card-header"><h2>LIVE PLANETARY SYSTEM</h2><small>WEBGL2 / REAL-TIME GRAPHICS</small></div>
 <div id="aether-scene" class="aether-scene"><div class="aether-scene-heading"><span class="aether-kicker">COSMIC WORKSPACE</span><h3>Explore your orbit.</h3><p>Drag to rotate. Scroll to zoom. Click planets to inspect.</p></div><div class="aether-radar" aria-hidden="true"></div>
 <div class="aether-scene-bottom"><span class="aether-chip">◎ 3D UNIVERSE · INTERACTIVE</span><span class="aether-chip" id="aether-fps">LIVE RENDERER</span></div></div>
 <div class="aether-toolbar" id="aether-toolbar"></div></section>
 <section class="aether-card"><div class="aether-card-header"><h2>YOUR PLANETS</h2><small>CLICK TO FOCUS</small></div><div class="aether-planet-list" id="aether-planet-list"></div></section></div>
 <div class="aether-stack"><section class="aether-card"><div class="aether-card-header"><h2>PLANET INSPECTOR</h2><small>YOUR SELECTED WORLD</small></div><div class="aether-inspector" id="aether-inspector"></div></section>
 <section class="aether-card"><div class="aether-card-header"><h2>TOP STAR SYSTEMS</h2><small>DOMAIN CLUSTERS</small></div><div class="aether-planet-list" id="aether-domains"></div></section></div></div>`;
 element('aether-stats').append(statGrid());
 cockpit=new AetherCockpit(element('aether-scene'),{onSelect:planet=>{selected=planet;inspector(element('aether-inspector'),planet);},onFrame:fps=>{const fpsEl=document.getElementById('aether-fps');if(fpsEl)fpsEl.textContent=`${Math.round(fps)} FPS · WEBGL2`;}});
 cockpit.update(tabs);inspector(element('aether-inspector'),selected);
 const toolbar=element('aether-toolbar');const input=document.createElement('input');input.className='aether-input';input.type='search';input.placeholder='Search planets…';input.value=filter;input.setAttribute('aria-label','Search open tabs');
 input.oninput=()=>{filter=input.value;redrawPlanets();};toolbar.append(input);
 const selector=document.createElement('select');selector.className='aether-select';selector.setAttribute('aria-label','Choose galaxy formation');for(const [index,f] of formations.entries())selector.add(new Option(f.label,String(index)));
 selector.onchange=()=>{cockpit?.setFormation(Number(selector.value));};toolbar.append(selector);
 const fitButton=button('Fit all',()=>cockpit?.reset());toolbar.append(fitButton);
 const motionButton=button(paused?'Resume motion':'Pause motion',()=>{const running=cockpit?.scene.pause();paused=!running;motionButton.textContent=paused?'Resume motion':'Pause motion';});toolbar.append(motionButton);
 const orbitButton=button('Cinematic orbit',()=>{cockpit?.startTour('orbit');toast('Cinematic orbit started. Use Fit all to stop.');});
 const flyoverButton=button('Planet flyover',()=>{cockpit?.startTour('flyover');toast('Planet flyover started. Use Fit all to stop.');});
 toolbar.append(orbitButton,flyoverButton);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){orbitButton.disabled=true;flyoverButton.disabled=true;orbitButton.title='Disabled for reduced motion';}
 const list=element('aether-planet-list');list.addEventListener('click',e=>{const found=(e.target as HTMLElement).closest<HTMLElement>('[data-tab-id]');if(!found)return;const id=Number(found.dataset.tabId);cockpit?.focus(id);const planet=cockpit?.scene.getPlanets().find(p=>p.tab.id===id)||null;selected=planet;inspector(element('aether-inspector'),planet);});
 redrawPlanets();
}
function redrawPlanets(){if(!cockpit)return;
 const visible=tabs.filter(t=>`${t.title} ${t.url}`.toLowerCase().includes(filter.toLowerCase()));cockpit.update(visible);
 const list=element('aether-planet-list');clear(list);
 for(const tab of visible.slice(0,18)){
  const control=text('button','','aether-planet-row') as HTMLButtonElement;control.type='button';control.dataset.tabId=String(tab.id);
  const orb=text('span','','aether-mini-orb');orb.style.setProperty('--orb-color',`hsl(${Math.abs(tab.id*37)%360} 70% 55%)`);
  const name=text('span','');name.append(text('strong',safeTitle(tab)),text('small',host(tab.url)));control.append(orb,name);list.append(control);
 }
 if(!visible.length)list.append(text('div','No planets match the current search.','aether-empty'));
 const domains=element('aether-domains');clear(domains);
 for(const [domain,count] of topEntries(countBy(tabs,t=>host(t.url)),6)){
  const row=text('div','','aether-planet-row');row.append(text('span','◉','aether-symbol'),text('span',`${domain} · ${count} planet${count===1?'':'s'}`));domains.append(row);
 }
}
function renderReport(feature:AetherFeature,report:AetherReport):HTMLElement{
 const surface=text('section','','aether-card aether-report');const header=text('div','','aether-card-header');header.append(text('h2',report.title),text('small',feature.category.toUpperCase()));surface.append(header);
 const body=text('div','','aether-panel-body aether-report');body.append(text('p',report.description,'aether-note'));
 const metrics=text('div','','aether-report-metrics');for(const metric of report.metrics){const box=text('div','','aether-report-metric');box.append(text('small',metric.label),text('strong',metric.value));if(metric.context)box.append(text('small',metric.context));metrics.append(box);}body.append(metrics);
 const list=text('div','');for(const row of report.rows.slice(0,80)){
  const item=text('div','','aether-report-row');item.append(text('span','◉','aether-symbol'));
  const fields=text('span','');fields.append(text('strong',row.title),text('small',row.description));item.append(fields);
  if(row.tabId&&hasLiveTabs()){const open=button('Open',()=>{void applyTabAction(row.tabId!,'open');});open.setAttribute('aria-label',`Open tab ${row.title}`);item.append(open);}list.append(item);
 }if(!report.rows.length)list.append(text('div',report.emptyMessage,'aether-empty'));body.append(list);
 body.append(text('p',report.summary,'aether-note'));for(const note of report.notes||[])body.append(text('p',note,'aether-note'));surface.append(body);return surface;
}
function mountInstruments(activeFeature?:string){
 setHeading('Mission instruments.','Practical tools for navigating your tabs, understanding your browser and building a calmer workspace.');
 const content=element('aether-content');clear(content);
 if(activeFeature){const feature=getFeature(activeFeature);if(feature){const back=button('← All instruments',()=>navigate('instruments'));back.style.marginBottom='20px';
    const report=feature.analyze(tabs);content.append(back,renderReport(feature,report));
    if(feature.renderDetail)content.append(feature.renderDetail(tabs,report));return;}}
 const container=text('div','','aether-tool-grid');for(const feature of features){const card=text('button','','aether-tool-card') as HTMLButtonElement;card.type='button';card.append(text('span','✦','aether-tool-icon'),text('strong',feature.label),text('p',feature.short));card.onclick=()=>navigate('instruments',feature.id);container.append(card);}content.append(container);
 if(!features.length)content.append(text('div','Mission instruments are being initialized.','aether-empty'));
}
function mountObservatory(){
 setHeading('Your workspace, decoded.','Domain distribution and real browser metadata, without tracking your browsing history.');const target=element('aether-content');clear(target);target.append(statGrid());
 const domainCount=countBy(tabs,tab=>host(tab.url));const report:AetherReport={title:'Your browser constellation',description:'A live overview of open tabs, grouped by website.',
 metrics:[{label:'Active planets',value:String(tabs.filter(t=>t.active).length)},{label:'Pinned worlds',value:String(tabs.filter(t=>t.pinned).length)},{label:'Background tabs',value:String(tabs.filter(t=>!t.active).length)}],
 rows:topEntries(domainCount,30).map(([domain,count])=>({id:domain,title:domain,description:`${count} open tab${count===1?'':'s'} orbit this domain.`})),
 summary:'OrbitNest uses current tab metadata. It does not collect or upload a browsing history.',emptyMessage:'No star systems discovered.'};
 target.append(renderReport({id:'overview',label:'Overview',category:'Telemetry',short:'',analyze:()=>report},report));
}
function mountPreferences(){
 setHeading('Shape your space.','Control how your galaxy looks and moves, with settings stored only in this browser.');const target=element('aether-content');clear(target);
 const card=text('div','','aether-card');const body=text('div','','aether-panel-body aether-settings');
 const themes=['midnight','cosmic','amber'] as const;
 const themeRow=text('div','','aether-setting');themeRow.append(text('div','Theme · Choose your universe'));
 const themeSelect=document.createElement('select');themeSelect.className='aether-select';for(const theme of themes)themeSelect.add(new Option(theme[0].toUpperCase()+theme.slice(1),theme));themeSelect.value=preferences.theme;
 themeSelect.onchange=()=>{preferences.theme=themeSelect.value as AetherPreferences['theme'];persist();};themeRow.append(themeSelect);body.append(themeRow);
 for(const [key,title,description] of [['motion','Planet motion','Animate orbital movement'],['stars','Starlight','Show a subtle animated starfield'],['showLabels','Accessible labels','Show planet titles in lists']] as const){
  const row=text('label','','aether-setting');const copy=text('span','');copy.append(text('strong',title),text('p',description));row.append(copy);
  const check=document.createElement('input');check.type='checkbox';check.checked=preferences[key];check.onchange=()=>{preferences[key]=check.checked;persist();};row.append(check);body.append(row);
 }card.append(body);target.append(card);
}
function persist(){document.documentElement.dataset.aetherTheme=preferences.theme;if(!savePreferences(preferences))toast('Browser storage is unavailable');else toast('Preferences saved');}
function mountView(feature?:string){disposeScene();currentView=['planetarium','instruments','observatory','preferences','nova'].includes(currentView)?currentView:'planetarium';
 document.documentElement.dataset.aetherTheme=preferences.theme;
 if(currentView==='nova')novaDispose=mountNova(element('aether-content'),tabs,toast,()=>{void updateTabs();});
 if(currentView==='planetarium')mountPlanetarium();if(currentView==='instruments')mountInstruments(feature);
 if(currentView==='observatory')mountObservatory();if(currentView==='preferences')mountPreferences();
 element('aether-live').textContent=hasLiveTabs()?'LIVE TABS CONNECTED':'PREVIEW / DEMO DATA';
}
async function updateTabs(){try{tabs=await getTabs();}catch(error){console.error('Unable to load browser tabs',error);toast('Could not read tabs');tabs=[];}
 const featureId=decodeURIComponent(location.hash.split('/')[1]||'');mountView(featureId);}
function currentLocation(){const [view,feature]=location.hash.replace(/^#/,'').split('/');currentView=(['planetarium','instruments','observatory','preferences','nova'].includes(view)?view:'planetarium') as AetherView;
 return feature?decodeURIComponent(feature):undefined;}
function attachEvents(){window.addEventListener('hashchange',()=>{currentLocation();mountView(decodeURIComponent(location.hash.split('/')[1]||''));});
 document.addEventListener('keydown',e=>{if((e.target instanceof HTMLInputElement)||(e.target instanceof HTMLTextAreaElement))return;
 if(e.key==='Escape'&&currentView==='instruments')navigate('instruments');if(e.key==='f'&&currentView==='planetarium')cockpit?.reset();});
 let timer:number|null=null;const runtime=(globalThis as unknown as {chrome?:{tabs?:{onUpdated?:{addListener(fn:()=>void):void},onRemoved?:{addListener(fn:()=>void):void}}}}).chrome;
 const update=()=>{if(timer!==null)window.clearTimeout(timer);timer=window.setTimeout(()=>{if(isAlive())void updateTabs();},350);};
 runtime?.tabs?.onUpdated?.addListener(update);runtime?.tabs?.onRemoved?.addListener(update);
}
currentLocation();shell();attachEvents();void updateTabs();

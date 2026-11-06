import {el,action} from './dom.ts';
import type {NovaStats} from '../core/model.ts';
const NAV=[['universe','3D Universe','◉'],['systems','Star systems','✧'],['sessions','Sessions','▤'],['focus','Focus mission','◎'],['insights','Observatory','▥'],['commands','Command deck','⌘'],['settings','Preferences','⚙']] as const;
export interface NovaShell {
 root:HTMLElement;stage:HTMLElement;inspector:HTMLElement;content:HTMLElement;
 menu:HTMLElement;search:HTMLInputElement;status:HTMLElement;title:HTMLElement;
}
export function createShell(host:HTMLElement,onPage:(id:string)=>void):NovaShell{
 const root=el('section','nova-root');root.id='nova-root';
 const sidebar=el('aside','nova-sidebar');
 const brand=el('a','nova-brand');brand.href='./aether.html#planetarium';
 brand.append(el('span','nova-logo','✦'));
 const name=el('span','nova-brand-name','ORBITNEST');name.append(el('small','','NOVA EXPLORATION SUITE'));brand.append(name);
 const mainNav=el('nav','nova-nav');mainNav.setAttribute('aria-label','Nova primary navigation');
 for(const [id,title,mark] of NAV){const control=action(`${mark}  ${title}`,()=>onPage(id),'nova-nav-button');control.dataset.page=id;mainNav.append(control);}
 const sidebarFoot=el('div','nova-sidebar-foot','PRIVATE UNIVERSE');sidebarFoot.append(el('small','','Only your local browser metadata is used.'));
 sidebar.append(brand,el('p','nova-nav-caption','EXPLORE THE COSMOS'),mainNav,sidebarFoot);
 const main=el('main','nova-main');const top=el('header','nova-top');
 const breadcrumb=el('div','nova-breadcrumb','WORKSPACE / NOVA');
 const status=el('span','nova-live','LOCAL FIRST');top.append(breadcrumb,status);
 const hero=el('section','nova-hero');
 const copy=el('div');copy.append(el('span','nova-eyebrow','INTERACTIVE PLANETARY WORKSPACE'));
 const title=el('h1','','The universe is yours.');
 copy.append(title,el('p','','Every tab is a world. Explore, organize and focus on what matters.'));
 hero.append(copy,el('span','nova-hero-mark','✦'));
 const statArea=el('div','nova-stat-row');statArea.id='nova-stats';
 const columns=el('div','nova-layout');const primary=el('div','nova-primary');
 const stageCard=el('section','nova-card nova-scene-card');
 const stageHeader=el('div','nova-card-header');stageHeader.append(el('span','', 'LIVE GALAXY'),el('small','','WEBGL2 · 3D PLANETARY GRAPH'));
 const stage=el('div','nova-stage');stage.id='nova-stage';stage.setAttribute('aria-label','Interactive 3D tab universe');
 const floating=el('div','nova-stage-label');floating.append(el('span','nova-eyebrow','DEEP SPACE / LIVE'),el('strong','','Your worlds, in orbit.'),el('small','','Drag to rotate · Wheel to zoom · Select a planet'));
 stage.append(floating);
 const controls=el('div','nova-scene-controls');controls.id='nova-scene-controls';
 stageCard.append(stageHeader,stage,controls);const content=el('div','nova-content');content.id='nova-content';primary.append(stageCard,content);
 const secondary=el('aside','nova-secondary');
 const inspectorCard=el('section','nova-card');const header=el('div','nova-card-header');header.append(el('span','','PLANET INSPECTOR'),el('small','','ACTIVE WORLD'));
 const inspector=el('div','nova-inspector');inspector.id='nova-inspector';inspectorCard.append(header,inspector);
 const searchLabel=el('label','nova-field');searchLabel.append(el('span','','FIND A PLANET'));
 const search=el('input','nova-input');search.type='search';search.placeholder='Search title, domain or URL';search.autocomplete='off';searchLabel.append(search);
 secondary.append(inspectorCard,searchLabel,el('div','nova-system-list'));
 columns.append(primary,secondary);main.append(top,hero,statArea,columns);root.append(sidebar,main);
 host.replaceChildren(root);
 return {root,stage,inspector,content,menu:mainNav,search,status,title};
}
export function renderStats(target:HTMLElement,stats:NovaStats):void{
 const items:[string,number,string][]=[['TAB PLANETS',stats.total,'◉'],['STAR SYSTEMS',stats.domains,'✧'],['OPEN WINDOWS',stats.windows,'▤'],['AUDIO WORLDS',stats.audible,'♫']];
 target.replaceChildren(...items.map(([label,value,mark])=>{
  const card=el('div','nova-stat');card.append(el('span','nova-stat-symbol',mark),el('strong','',String(value)),el('small','',label));return card;
 }));
}

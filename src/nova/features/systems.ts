import type {NovaPanel} from '../core/model.ts';
import {searchSystems,suggestSystemLinks} from '../core/systems.ts';
import {el,action,empty,shortText} from '../components/dom.ts';
export const systemsPanel:NovaPanel={
 id:'systems',title:'Your star systems',description:'Real domain clusters and connections between browser windows.',
 render(host,context){
  const search=el('input','nova-input');search.type='search';search.placeholder='Filter domains or tab titles';search.setAttribute('aria-label','Filter star systems');
  const results=el('div','nova-grid');const links=el('div','nova-links');host.append(search,results,links);
  function draw(){const worlds=searchSystems(context.tabs,search.value);results.replaceChildren();
   if(!worlds.length)results.append(empty('No matching planets.'));
   for(const world of worlds){const card=el('article','nova-tile');card.append(el('span','nova-eyebrow',`${world.total} PLANETS / ${world.windows} WINDOWS`),el('strong','',world.domain),el('small','',`${world.pinned} pinned · ${world.active} active`));
    const tabs=el('div','nova-tab-stack');for(const tab of world.tabs.slice(0,5)){
     const control=action(shortText(tab.title,46),()=>{void context.open(tab.id);},'nova-link-button');
     control.setAttribute('aria-label',`Open ${tab.title}`);card.append(control);
    }card.append(tabs);results.append(card);
   }
   links.replaceChildren(el('h3','','Constellation connections'));
   for(const link of suggestSystemLinks(context.tabs).slice(0,8))links.append(el('div','nova-link-row',`${link.from} ↔ ${link.to} · ${link.sharedWindows} shared window${link.sharedWindows===1?'':'s'}`));
   if(links.children.length===1)links.append(el('p','','Different domains are not currently sharing a window.'));
  }
  search.addEventListener('input',draw);draw();
 }};

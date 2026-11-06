import type {NovaPanel} from '../core/model.ts';
import {findCommands} from '../core/commands.ts';
import {el,action,empty} from '../components/dom.ts';
export const commandsPanel:NovaPanel={id:'commands',title:'Command deck',
 description:'Find a mission or tool using natural words. Press Ctrl+K or Command+K to return here.',
 render(host,context){
  const input=el('input','nova-input');input.type='search';input.placeholder='Search commands, tools and planet tasks…';
  input.setAttribute('aria-label','Search Nova commands');input.autocomplete='off';
  const results=el('div','nova-command-list');host.append(input,results);
  function draw(){results.replaceChildren();const commands=findCommands(input.value);
   if(!commands.length)results.append(empty('No commands match the current search.'));
   for(const command of commands){
    const control=action('',()=>context.go(command.id),'nova-command');
    const info=el('div');info.append(el('strong','',command.label),el('small','',command.description));
    control.append(el('span','nova-command-glyph','⌘'),info,el('span','nova-command-shortcut',command.shortcut||'↵'));
    results.append(control);
   }
  }
  input.addEventListener('input',draw);draw();queueMicrotask(()=>input.focus());
 }};

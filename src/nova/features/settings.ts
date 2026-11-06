import type {NovaPanel} from '../core/model.ts';
import {PALETTES,getCurrentSettings,updateSettings} from '../core/theme.ts';
import {el} from '../components/dom.ts';
export const settingsPanel:NovaPanel={id:'settings',title:'Customize your cosmos',
 description:'Color, motion and information density are stored locally in this browser.',
 render(host,context){
  const current=getCurrentSettings();const form=el('div','nova-settings');
  const heading=el('h3','','Cosmic atmosphere');const palettes=el('div','nova-palette-grid');
  for(const palette of PALETTES){const button=el('button','nova-palette');button.type='button';button.style.setProperty('--nova-choice',palette.accent);
   button.append(el('span','nova-palette-orb'),el('strong','',palette.label),el('small','',palette.id.toUpperCase()));
   button.dataset.selected=String(current.theme===palette.id);
   button.onclick=()=>{current.theme=palette.id;save();palettes.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.dataset.selected=String(b===button));};palettes.append(button);
  }
  const motion=el('label','nova-setting-line');motion.append(el('span','','Allow camera and cloud animation'));
  const motionCheck=el('input');motionCheck.type='checkbox';motionCheck.checked=current.motion;motionCheck.onchange=()=>{current.motion=motionCheck.checked;save();};motion.append(motionCheck);
  const density=el('label','nova-setting-line');density.append(el('span','','Compact workspace spacing'));
  const densityCheck=el('input');densityCheck.type='checkbox';densityCheck.checked=current.density==='compact';densityCheck.onchange=()=>{current.density=densityCheck.checked?'compact':'relaxed';save();};density.append(densityCheck);
  function save(){if(!updateSettings(document.querySelector<HTMLElement>('#nova-root')!,current))context.notify('Settings could not be saved');else context.notify('Nova preferences saved locally');}
  form.append(heading,palettes,motion,density);host.append(form);
 }};

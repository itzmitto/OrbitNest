import type {NovaTab} from '../core/model.ts';
import {AetherCockpit} from '../../aether/ui/scene.ts';
import type {Planet} from '../../zenith/core/types.ts';
import {el,action,shortText} from './dom.ts';
import {domainOf} from '../core/model.ts';
export interface PlanetariumHandle {update(tabs:NovaTab[]):void;dispose():void;focus(id:number):void;}
export function mountPlanetarium(stage:HTMLElement,controls:HTMLElement,inspector:HTMLElement,onOpen:(id:number)=>void):PlanetariumHandle {
 let selected:Planet|null=null;let paused=false;let orbit=false;
 const renderer=new AetherCockpit(stage,{onSelect:planet=>{selected=planet;drawSelection();},onFrame:fps=>{status.textContent=`${Math.round(fps)} FPS`;}});
 const status=el('span','nova-frame','LIVE WEBGL');
 function drawSelection(){
  inspector.replaceChildren();
  if(!selected){inspector.append(el('div','nova-inspector-orb'),el('h3','','Select a planet'),el('p','','Click on a world to inspect its domain and browser window.'));return;}
  const tab=selected.tab;
  const sphere=el('div','nova-inspector-orb');sphere.style.setProperty('--planet-tone',`hsl(${selected.hue} 75% 55%)`);
  inspector.append(sphere,el('h3','',shortText(tab.title,90)),el('p','',domainOf(tab.url)));
  const rows=[['WINDOW',String(tab.windowId)],['PINNED',tab.pinned?'YES':'NO'],['SOUND',tab.audible?'ACTIVE':'OFF'],['URL',shortText(tab.url,58)]];
  for(const [label,value] of rows){const row=el('div','nova-inspector-row');row.append(el('span','',label),el('strong','',value));inspector.append(row);}
  inspector.append(action('OPEN BROWSER TAB',()=>onOpen(tab.id),'nova-button nova-button-accent'));
 }
 const fit=action('Fit galaxy',()=>{renderer.reset();orbit=false;});
 const tour=action('Cinematic orbit',()=>{orbit=!orbit;if(orbit)renderer.startTour('orbit');else renderer.stopTour();tour.textContent=orbit?'Stop orbit':'Cinematic orbit';});
 const flyover=action('Planet flyover',()=>{renderer.startTour('flyover');orbit=false;});
 const toggle=action('Pause scene',()=>{renderer.scene.pause();paused=!paused;toggle.textContent=paused?'Resume scene':'Pause scene';});
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){tour.disabled=true;flyover.disabled=true;}
 controls.append(fit,tour,flyover,toggle,status);
 const onKey=(event:KeyboardEvent)=>{if(event.target instanceof HTMLInputElement||event.target instanceof HTMLTextAreaElement)return;
  if(event.key==='f'&&(document.activeElement===stage||stage.contains(document.activeElement)))renderer.reset();};
 stage.addEventListener('keydown',onKey);stage.tabIndex=0;drawSelection();
 return {update:tabs=>renderer.update(tabs),focus:id=>{renderer.focus(id);selected=renderer.scene.getPlanets().find(p=>p.tab.id===id)||null;drawSelection();},
  dispose:()=>{stage.removeEventListener('keydown',onKey);renderer.dispose();}};
}

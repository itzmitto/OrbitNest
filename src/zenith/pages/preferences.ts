import {setContent,toast} from '../ui/shell';
import {defaults,getPreferences,savePreferences,writeStored} from '../core/state';
import {escapeHTML} from '../core/math';
import type {ThemeName} from '../core/types';
const themes:[ThemeName,string,string][]=[['nebula','Nebula Violet','Soft violet and sapphire'],['eclipse','Black Eclipse','Near-black with silver accents'],['aurora','Arctic Aurora','Emerald and cyan glow'],['solar','Solar Flare','Amber and burning orange']];
export async function mountPreferences():Promise<()=>void>{
 let value=getPreferences();const target=setContent(`<div class="z-grid"><section class="z-card"><div class="z-card__title"><h2>SPACE APPEARANCE</h2><small>LOCAL SETTINGS</small></div>
 <div class="z-form"><label>ATMOSPHERE <select id="z-theme">${themes.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label>
 <label>PLANET SCALE <input type="range" min="0.6" max="1.6" step="0.1" id="z-planet-scale"><output id="z-scale-output"></output></label>
 <label>STARFIELD DENSITY <input type="range" min="0.5" max="2" step="0.1" id="z-density"><output id="z-density-output"></output></label></div></section>
 <section class="z-card"><div class="z-card__title"><h2>ACCESSIBILITY & MOTION</h2><small>PERSONAL CONTROLS</small></div>
 <div class="z-form"><label><input id="z-motion" type="checkbox"> Reduce space movement</label><label><input id="z-labels" type="checkbox"> Show planet labels</label><label><input id="z-trails" type="checkbox"> Display orbit trails</label>
 <p class="z-muted">These settings are stored on this device. Browser-restricted modes may prevent storage.</p>
 <button class="z-btn" id="z-reset">Restore defaults</button><button class="z-btn z-btn--primary" id="z-save-prefs">Save settings</button></div></section></div>
 <section class="z-card z-section"><div class="z-card__title"><h2>PRIVACY</h2></div><div class="z-form"><p class="z-muted">OrbitNest reads your tabs only for on-device visualization. No site content is collected by Zenith. Local sessions can be exported manually.</p></div></section>`);
 const get=<T extends HTMLElement>(id:string)=>target.querySelector<T>(`#${id}`)!;
 function update(){get<HTMLSelectElement>('z-theme').value=value.theme;get<HTMLInputElement>('z-motion').checked=value.reducedMotion;
 get<HTMLInputElement>('z-labels').checked=value.showLabels;get<HTMLInputElement>('z-trails').checked=value.showTrails;
 get<HTMLInputElement>('z-planet-scale').value=String(value.planetScale);get<HTMLInputElement>('z-density').value=String(value.density);
 get<HTMLElement>('z-scale-output').textContent=value.planetScale.toFixed(1)+'×';get<HTMLElement>('z-density-output').textContent=value.density.toFixed(1)+'×';}
 const save=()=>{value={theme:get<HTMLSelectElement>('z-theme').value as ThemeName,reducedMotion:get<HTMLInputElement>('z-motion').checked,
 showLabels:get<HTMLInputElement>('z-labels').checked,showTrails:get<HTMLInputElement>('z-trails').checked,
 planetScale:Number(get<HTMLInputElement>('z-planet-scale').value),density:Number(get<HTMLInputElement>('z-density').value)};
 savePreferences(value);document.documentElement.dataset.theme=value.theme;update();toast('Space settings saved');};
 get<HTMLButtonElement>('z-save-prefs').onclick=save;get<HTMLButtonElement>('z-reset').onclick=()=>{value={...defaults};update();save();};
 get<HTMLSelectElement>('z-theme').onchange=()=>{document.documentElement.dataset.theme=get<HTMLSelectElement>('z-theme').value;};
 get<HTMLInputElement>('z-density').oninput=e=>{get<HTMLElement>('z-density-output').textContent=Number((e.target as HTMLInputElement).value).toFixed(1)+'×';};
 get<HTMLInputElement>('z-planet-scale').oninput=e=>{get<HTMLElement>('z-scale-output').textContent=Number((e.target as HTMLInputElement).value).toFixed(1)+'×';};
 update();return ()=>{};
}

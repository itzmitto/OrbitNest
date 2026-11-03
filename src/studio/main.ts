import './style.css';
import { loadStudioTabs, activateStudioTab, subscribeTabChanges } from './data';
import type { StudioTab, StudioNode } from './types';
import { makeNodes, makeEdges } from './graph';
import { drawScene, drawMinimap, hitNode } from './renderer';
import { createCamera, pointFromEvent, zoomAtPointer, fitCamera, type StudioCamera } from './camera';
import { layoutPresets } from './layouts';
import { skyPalettes } from './palettes';
import { tabLenses } from './lenses';

const root = document.querySelector<HTMLDivElement>('#studio-root');
if (!root) throw new Error('OrbitNest Galaxy Studio root not found');
root.innerHTML = `<div class="studio-shell">
<aside class="studio-sidebar"><div class="studio-brand"><span class="studio-mark">✦</span><div><strong>ORBITNEST</strong><small>GALAXY STUDIO / 1.0</small></div></div>
<a class="studio-return" href="./index.html">← BACK TO UNIVERSE</a>
<div class="studio-section-label">STAR MAP CONTROLS</div>
<label class="studio-control">GALAXY FORMATION<select id="layout"></select></label>
<label class="studio-control">ATMOSPHERE<select id="palette"></select></label>
<label class="studio-control">TAB LENS<select id="lens"></select></label>
<label class="studio-control">SEARCH TABS<input id="query" type="search" autocomplete="off" placeholder="Title or domain…"/></label>
<div class="studio-tips">SCROLL TO ZOOM<br>DRAG TO PAN<br>CLICK A PLANET TO INSPECT<br>PRESS F TO FIT THE GALAXY</div>
<div class="studio-private">● LOCAL TAB DATA ONLY</div></aside>
<main class="studio-main"><header class="studio-top"><div><span class="studio-kicker">LIVE INTERACTIVE CONSTELLATION</span><h1>Every tab has its orbit.</h1><p>Shape your browsing universe. Discover connections without leaving this device.</p></div>
<div class="studio-counts"><div><b id="total-tabs">0</b><span>TABS</span></div><div><b id="total-domains">0</b><span>DOMAINS</span></div><div><b id="total-windows">0</b><span>WINDOWS</span></div></div></header>
<section class="studio-viewport"><div class="studio-toolbar"><span class="studio-live" id="live-state">INITIALIZING</span><div class="studio-actions"><button id="fit">FIT ALL</button><button id="pause">PAUSE</button><button id="labels">LABELS ON</button><button id="zoom-in">+</button><button id="zoom-out">−</button></div></div>
<div class="studio-stage" id="stage"><canvas id="starfield" aria-label="Interactive graph of open browser tabs"></canvas><canvas id="mini" aria-label="Minimap of tab planets"></canvas><div class="studio-stage-note">DRAG · ZOOM · SELECT</div></div></section>
<section class="studio-bottom"><article class="studio-panel"><span class="studio-kicker">CURRENT GALAXY</span><h2 id="map-title">GALAXY LOADING</h2><p id="map-summary">Using only your browser tab metadata.</p><div class="studio-legend"><span>● TAB PLANETS</span><span>— SHARED DOMAIN</span><span>— SHARED WINDOW</span></div></article>
<article class="studio-panel"><span class="studio-kicker">PLANET INSPECTOR</span><h2 id="selected-title">Select a planet</h2><p id="selected-detail">Click a planet to inspect its domain and window.</p><button class="studio-open" id="open-tab" disabled>ACTIVATE BROWSER TAB ↗</button></article></section></main></div>`;
const element=<T extends HTMLElement>(id:string):T=>{const node=document.getElementById(id);if(!node)throw new Error(`Studio control not found: ${id}`);return node as T;};
const canvas=element<HTMLCanvasElement>('starfield'),mini=element<HTMLCanvasElement>('mini'),stage=element<HTMLDivElement>('stage');
const paint=canvas.getContext('2d'),mapPaint=mini.getContext('2d');if(!paint||!mapPaint)throw new Error('Galaxy Studio requires Canvas 2D');
let tabs:StudioTab[]=[],nodes:StudioNode[]=[],selected:number|null=null,hover:number|null=null;
let isDemo=false,paused=false,labels=true,layoutId='golden',paletteId='deep',lensId='all',query='';
let camera:StudioCamera=createCamera(),frame=0,drag:{x:number;y:number;ox:number;oy:number;distance:number}|null=null;
const safeChoice=(key:string,values:{id:string}[],fallback:string)=>{try{const value=localStorage.getItem('orbitnest-studio-'+key);return values.some(v=>v.id===value)?value!:fallback;}catch{return fallback;}};
const persist=(key:string,value:string)=>{try{localStorage.setItem('orbitnest-studio-'+key,value);}catch{/* private mode */}};
layoutId=safeChoice('layout',layoutPresets,'golden');paletteId=safeChoice('palette',skyPalettes,'deep');lensId=safeChoice('lens',tabLenses,'all');
const layout=()=>layoutPresets.find(x=>x.id===layoutId)||layoutPresets[0];
const palette=()=>skyPalettes.find(x=>x.id===paletteId)||skyPalettes[0];
const lens=()=>tabLenses.find(x=>x.id===lensId)||tabLenses[0];
const controls=[['layout',layoutPresets],['palette',skyPalettes],['lens',tabLenses]] as const;
for(const [id,choices] of controls){const el=element<HTMLSelectElement>(id);for(const choice of choices){const option=document.createElement('option');option.value=choice.id;option.textContent=choice.label;el.append(option);}el.value=id==='layout'?layoutId:id==='palette'?paletteId:lensId;el.addEventListener('change',()=>{if(id==='layout')layoutId=el.value;else if(id==='palette')paletteId=el.value;else lensId=el.value;persist(id,el.value);update();fitCamera(camera,nodes,stage.clientWidth,stage.clientHeight);});}
function update(){const filtered=lens().filter(tabs).filter(t=>(t.title+' '+t.domain).toLowerCase().includes(query.toLowerCase()));nodes=makeNodes(filtered,layout());element<HTMLElement>('total-tabs').textContent=String(tabs.length);element<HTMLElement>('total-domains').textContent=String(new Set(tabs.map(t=>t.domain)).size);element<HTMLElement>('total-windows').textContent=String(new Set(tabs.map(t=>t.windowId)).size);element<HTMLElement>('map-title').textContent=`${layout().label.toUpperCase()} / ${palette().label.toUpperCase()}`;element<HTMLElement>('map-summary').textContent=`${nodes.length} matching tab worlds · ${lens().label} lens · ${makeEdges(nodes).length} meaningful connections`;if(selected!==null&&!nodes.some(n=>n.id===selected))select(null);}
function select(id:number|null){selected=id;const tab=tabs.find(t=>t.id===id);element<HTMLElement>('selected-title').textContent=tab?.title||'Select a planet';element<HTMLElement>('selected-detail').textContent=tab?`${tab.domain} · Window ${tab.windowId} · ${tab.pinned?'Pinned · ':''}${tab.audible?'Playing audio':'Silent'}`:'Click a planet to inspect its domain and window.';element<HTMLButtonElement>('open-tab').disabled=!tab||isDemo;}
function dimensions(){const rect=stage.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.floor(rect.width*dpr));canvas.height=Math.max(1,Math.floor(rect.height*dpr));canvas.style.width=`${rect.width}px`;canvas.style.height=`${rect.height}px`;return {w:rect.width,h:rect.height,dpr};}
let last=0;
function animate(now:number){frame=requestAnimationFrame(animate);if(document.hidden||now-last<25)return;last=now;const {w,h,dpr}=dimensions();paint!.setTransform(dpr,0,0,dpr,0,0);drawScene(paint!,nodes,makeEdges(nodes),palette(),camera,w,h,paused?0:now,selected,hover,labels);drawMinimap(mapPaint!,nodes,selected);}
function pos(e:PointerEvent|WheelEvent){return pointFromEvent(e,canvas);}
canvas.addEventListener('pointerdown',e=>{const p=pos(e);drag={x:p.x,y:p.y,ox:camera.x,oy:camera.y,distance:0};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{const p=pos(e);if(drag){const dx=p.x-drag.x,dy=p.y-drag.y;drag.distance=Math.max(drag.distance,Math.hypot(dx,dy));camera.x=drag.ox+dx/camera.scale;camera.y=drag.oy+dy/camera.scale;}else hover=hitNode(nodes,camera,p.x,p.y,stage.clientWidth,stage.clientHeight);});
canvas.addEventListener('pointercancel',()=>{drag=null;});
canvas.addEventListener('pointerup',e=>{if(drag&&drag.distance<6){const p=pos(e);select(hitNode(nodes,camera,p.x,p.y,stage.clientWidth,stage.clientHeight));}drag=null;});
canvas.addEventListener('wheel',e=>{e.preventDefault();const p=pos(e);zoomAtPointer(camera,e.deltaY<0?1.12:.88,p.x,p.y,stage.clientWidth,stage.clientHeight);},{passive:false});
element<HTMLButtonElement>('fit').onclick=()=>fitCamera(camera,nodes,stage.clientWidth,stage.clientHeight);
element<HTMLButtonElement>('zoom-in').onclick=()=>{camera.scale=Math.min(3,camera.scale*1.2);};
element<HTMLButtonElement>('zoom-out').onclick=()=>{camera.scale=Math.max(.25,camera.scale/1.2);};
element<HTMLButtonElement>('pause').onclick=e=>{paused=!paused;(e.currentTarget as HTMLButtonElement).textContent=paused?'PLAY':'PAUSE';};
element<HTMLButtonElement>('labels').onclick=e=>{labels=!labels;(e.currentTarget as HTMLButtonElement).textContent=labels?'LABELS ON':'LABELS OFF';};
element<HTMLInputElement>('query').addEventListener('input',e=>{query=(e.target as HTMLInputElement).value;update();});
element<HTMLButtonElement>('open-tab').onclick=async()=>{const tab=tabs.find(t=>t.id===selected);if(tab&&!isDemo)await activateStudioTab(tab);};
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key.toLowerCase()==='f')fitCamera(camera,nodes,stage.clientWidth,stage.clientHeight);if(e.key==='Escape')select(null);});
const observer=new ResizeObserver(()=>{dimensions();});observer.observe(stage);
async function refresh(){const result=await loadStudioTabs();tabs=result.tabs;isDemo=result.isDemo;element<HTMLElement>('live-state').textContent=isDemo?'○ PREVIEW MODE':'● LIVE EXTENSION';update();}
const dispose=subscribeTabChanges(()=>void refresh());
void refresh().then(()=>fitCamera(camera,nodes,stage.clientWidth,stage.clientHeight));frame=requestAnimationFrame(animate);
window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);observer.disconnect();dispose();});

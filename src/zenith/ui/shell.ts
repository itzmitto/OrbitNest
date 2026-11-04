import type {Page} from '../core/types.ts';
import {escapeHTML} from '../core/math.ts';
const routes:[Page,string,string][]=[
 ['planetarium','◉','Planetarium'],['atlas','✧','Galaxy Atlas'],['observatory','◷','Observatory'],
 ['sessions','▤','Sessions'],['mission-control','⌘','Mission Control'],['preferences','⚙','Preferences']
];
export function layout(page:Page,title:string,subheading:string):HTMLElement {
 const wrapper=document.createElement('div');wrapper.id='zenith-root';
 const links=routes.map(([key,icon,label])=>`<a href="./${key}.html" ${key===page?'aria-current="page"':''} title="${label}"><b aria-hidden="true">${icon}</b><span>${label}</span></a>`).join('');
 wrapper.innerHTML=`<aside class="z-side"><a href="./planetarium.html" class="z-brand" aria-label="OrbitNest home"><div class="z-brand__symbol">◉</div><div><strong>OrbitNest</strong><span>SPACE OPERATING SYSTEM</span></div></a>
 <div><div class="z-nav-label">Explore your universe</div><nav class="z-nav" aria-label="Space navigation">${links}</nav></div>
 <div class="z-side-bottom"><span class="z-badge">● LOCAL-FIRST</span><strong>Private by design</strong><small>Browser tab metadata stays in your browser. No cloud account required.</small></div></aside>
 <div class="z-main"><header class="z-top"><div class="z-top-left"><span class="z-crumb">Workspace / <strong>${escapeHTML(title)}</strong></span></div>
 <div class="z-top-right"><a class="z-home-link" href="./index.html">← Classic view</a><span class="z-status" id="z-connection">Loading tabs</span><div class="z-avatar">ON</div></div></header>
 <section class="z-page-head"><div><div class="z-eyebrow">THE NEXT FRONTIER</div><h1>${escapeHTML(title)}</h1><p class="z-lead">${escapeHTML(subheading)}</p></div><div class="z-actions" id="z-head-actions"></div></section>
 <div id="z-page-content"></div></div>`;
 return wrapper;
}
export function setContent(html:string):HTMLElement{const el=document.querySelector<HTMLElement>('#z-page-content');if(!el)throw Error('Page shell missing');el.innerHTML=html;return el;}
export function toast(message:string):void{
 const prev=document.querySelector('.z-toast');prev?.remove();const el=document.createElement('div');el.className='z-toast';el.role='status';el.textContent=message;
 document.body.append(el);window.setTimeout(()=>el.remove(),3200);
}
export function stat(label:string,value:number|string,subtitle:string):string{return `<div class="z-card z-stat"><span>${escapeHTML(label)}</span><strong>${escapeHTML(String(value))}</strong><i>${escapeHTML(subtitle)}</i></div>`;}

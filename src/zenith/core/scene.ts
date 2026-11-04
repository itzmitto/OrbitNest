import type {BrowserTab,Planet,OrbitPreset} from './types';
import {hashText,seededRandom,TAU} from './math';
export const defaultFormation:OrbitPreset={id:'solar-spiral',label:'Solar spiral',description:'A balanced 3D elliptical orbit around your tabs.',
 place(index,count,seed){const t=index/(Math.max(count,1))*TAU*2.1+seed*.0001,spread=2.7+Math.sqrt(index+1)*1.8;
 return {x:Math.cos(t)*spread,y:Math.sin(t*1.4)*1.55,z:Math.sin(t)*spread*.7};}};
export function buildPlanets(tabs:BrowserTab[],preset:OrbitPreset=defaultFormation):Planet[]{
 return tabs.map((tab,index)=>{const seed=hashText(tab.url||String(tab.id)),pos=preset.place(index,tabs.length,seed);
 return {id:String(tab.id),tab,x:pos.x,y:pos.y,z:pos.z,radius:(tab.active?1.18:tab.pinned?.91:.66)+seededRandom(seed)*.21,
 hue:(seed%360)/360,material:seed%6,moonCount:tab.audible?3:tab.pinned?2:seed%3};});
}
export function groupDomainCounts(tabs:BrowserTab[]):{name:string;count:number}[]{
 const counts=new Map<string,number>();for(const t of tabs){let host='New tab';try{host=new URL(t.url).hostname||host;}catch{}
 counts.set(host,(counts.get(host)||0)+1);}return [...counts].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name));
}

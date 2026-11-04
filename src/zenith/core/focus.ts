import type {BrowserTab,Planet} from './types.ts';
export interface FocusResult{planet:Planet|null;index:number;total:number;}
export function activePlanet(planets:Planet[]):Planet|null{return planets.find(p=>p.tab.active)||null;}
export function focusNext(planets:Planet[],current:string|null,direction:1|-1=1):FocusResult{
 if(!planets.length)return {planet:null,index:0,total:0};
 const currentIndex=planets.findIndex(p=>p.id===current);const index=(currentIndex+direction+planets.length)%planets.length;
 return {planet:planets[index],index:index+1,total:planets.length};
}
export function focusByHost(planets:Planet[],hostname:string):Planet[]{return planets.filter(p=>{
 try{return new URL(p.tab.url).hostname===hostname;}catch{return false;}});}

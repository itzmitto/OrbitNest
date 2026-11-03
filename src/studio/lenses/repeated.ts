import type { StudioLens } from '../types';
/** Duplicate destinations: a non-destructive lens over the existing open browser tabs. */
export const lensRepeated:StudioLens={id:'repeated',label:'Duplicate destinations',filter(tabs){const counts=new Map<string,number>();for(const t of tabs){try{const u=new URL(t.url);u.hash="";const k=u.toString();counts.set(k,(counts.get(k)||0)+1);}catch{/* only safe URLs */}}return tabs.filter(t=>{try{const u=new URL(t.url);u.hash='';return counts.get(u.toString())!>1;}catch{return false;}});}};

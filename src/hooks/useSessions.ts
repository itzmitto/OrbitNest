import { useState } from 'react';
import { createSession, parseSession, type SessionSnapshot } from '../domain/session';
import type { TabRecord } from '../domain/tab';
const KEY='orbitnest:sessions:v1';
function read():SessionSnapshot[]{try{const value=JSON.parse(localStorage.getItem(KEY)??'[]');return Array.isArray(value)?value.map(parseSession).filter((s):s is SessionSnapshot=>s!==null).slice(0,20):[];}catch{return [];}}
export function useSessions(){
 const [sessions,setSessions]=useState<SessionSnapshot[]>(read);
 const save=(tabs:TabRecord[])=>{const name=window.prompt('Name this local tab session:','My universe');if(name===null)return;const next=[createSession(name,tabs),...sessions].slice(0,20);try{localStorage.setItem(KEY,JSON.stringify(next));setSessions(next);}catch{window.alert('Unable to save. Local storage may be full.');}};
 const remove=(index:number)=>{const next=sessions.filter((_,i)=>i!==index);try{localStorage.setItem(KEY,JSON.stringify(next));setSessions(next);}catch{window.alert('Unable to update local storage.');}};
 return {sessions,save,remove};
}

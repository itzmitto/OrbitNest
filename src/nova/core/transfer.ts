import {parseOrbits,type SavedOrbit} from './storage.ts';
export interface TransferBundle {format:'orbitnest.nova.sessions';version:1;created:string;sessions:SavedOrbit[]}
export function exportSessionBundle(sessions:SavedOrbit[],date=new Date()):string {
 return JSON.stringify({format:'orbitnest.nova.sessions',version:1,created:date.toISOString(),sessions:parseOrbits(sessions)} satisfies TransferBundle,null,2);
}
export function importSessionBundle(content:string):SavedOrbit[]{
 if(content.length>2_000_000)throw new Error('Session archive exceeds the 2 MB limit');
 let data:unknown;try{data=JSON.parse(content)}catch{throw new Error('The selected file is not valid JSON')}
 if(!data||typeof data!=='object')throw new Error('The selected archive has an invalid structure');
 const archive=data as Partial<TransferBundle>;
 if(archive.format!=='orbitnest.nova.sessions'||archive.version!==1||!Array.isArray(archive.sessions))
  throw new Error('This is not a supported Nova session archive');
 return parseOrbits(archive.sessions);
}
export function mergeSessionBundles(current:SavedOrbit[],incoming:SavedOrbit[]):SavedOrbit[]{
 const seen=new Set<string>();const merged:SavedOrbit[]=[];
 for(const orbit of [...incoming,...current]){
  const key=orbit.name.toLowerCase()+'|'+orbit.tabs.map(tab=>tab.url).sort().join('|');
  if(seen.has(key))continue;seen.add(key);merged.push(orbit);
  if(merged.length===30)break;
 }
 return merged;
}

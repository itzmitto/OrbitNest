import type { TabRecord } from './tab';
export type SessionSnapshot={version:1;name:string;savedAt:string;urls:string[]};
export function createSession(name:string,tabs:TabRecord[]):SessionSnapshot{
  return {version:1,name:name.trim().slice(0,80)||'Untitled session',savedAt:new Date().toISOString(),urls:tabs.map(t=>t.url).filter((url):url is string=>Boolean(url&&/^https?:\/\//.test(url)))};
}
export function parseSession(raw:unknown):SessionSnapshot|null{
  if(!raw||typeof raw!=='object')return null;
  const value=raw as Partial<SessionSnapshot>;
  if(value.version!==1||typeof value.name!=='string'||typeof value.savedAt!=='string'||!Array.isArray(value.urls)||value.urls.length>300||!value.urls.every(url=>typeof url==='string'&&url.length<8192&&/^https?:\/\//.test(url)))return null;
  return {version:1,name:value.name,savedAt:value.savedAt,urls:value.urls};
}

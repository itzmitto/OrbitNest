import type {SavedOrbit,TabBookmark} from './storage.ts';
export interface RestorePreview {safe:TabBookmark[]; rejected:number; alreadyOpen:number; requests:number}
export function previewRestore(orbit:SavedOrbit,openUrls:string[]):RestorePreview{
 const opened=new Set(openUrls);
 const safe:TabBookmark[]=[];let rejected=0,alreadyOpen=0;
 for(const bookmark of orbit.tabs){
  try {const value=new URL(bookmark.url);if(!['http:','https:'].includes(value.protocol)){rejected++;continue;}}
  catch{rejected++;continue;}
  if(opened.has(bookmark.url)){alreadyOpen++;continue;}
  if(!safe.some(tab=>tab.url===bookmark.url))safe.push(bookmark);
 }
 return {safe,rejected,alreadyOpen,requests:safe.length};
}
interface TabCreateApi {tabs?:{create(props:{url:string,active:boolean,pinned:boolean},cb:(tab:unknown)=>void):void};runtime?:{lastError?:unknown}}
export async function restoreBookmarks(bookmarks:TabBookmark[]):Promise<{created:number;failed:number}>{
 const browser=(globalThis as unknown as {chrome?:TabCreateApi}).chrome;
 if(!browser?.tabs?.create)return {created:0,failed:bookmarks.length};
 let created=0,failed=0;
 for(const bookmark of bookmarks){
  const success=await new Promise<boolean>(resolve=>{
   try {browser.tabs!.create({url:bookmark.url,active:false,pinned:bookmark.pinned},()=>resolve(!browser.runtime?.lastError));}
   catch{resolve(false)}
  });
  if(success)created++;else failed++;
 }
 return {created,failed};
}

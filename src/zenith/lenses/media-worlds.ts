import type {TabLens} from '../core/types.ts';
/** Video, audio and streaming websites. */
function host(url:string):string{try{return new URL(url).hostname.toLowerCase();}catch{return '';}}
export const lensMediaWorlds:TabLens={
 id:'media-worlds',label:'Media worlds',description:'Video, audio and streaming websites.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>/youtube|twitch|spotify|soundcloud|netflix|vimeo/.test(host(t.url)));
 }
};

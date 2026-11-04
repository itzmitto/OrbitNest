import type {TabLens} from '../core/types.ts';
/** Design, creative portfolios and inspiration. */
function host(url:string):string{try{return new URL(url).hostname.toLowerCase();}catch{return '';}}
export const lensCreativeWorlds:TabLens={
 id:'creative-worlds',label:'Creative worlds',description:'Design, creative portfolios and inspiration.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>/figma|behance|dribbble|canva|pinterest|unsplash|artstation/.test(host(t.url)));
 }
};

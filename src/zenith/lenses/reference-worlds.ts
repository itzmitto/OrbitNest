import type {TabLens} from '../core/types.ts';
/** Documentation, knowledge and wiki tabs. */
function host(url:string):string{try{return new URL(url).hostname.toLowerCase();}catch{return '';}}
export const lensReferenceWorlds:TabLens={
 id:'reference-worlds',label:'Reference worlds',description:'Documentation, knowledge and wiki tabs.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>/docs|developer|wikipedia|mdn|reference|learn/.test(host(t.url)));
 }
};

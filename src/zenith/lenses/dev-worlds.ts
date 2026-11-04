import type {TabLens} from '../core/types.ts';
/** GitHub, GitLab, code editors and docs. */
function host(url:string):string{try{return new URL(url).hostname.toLowerCase();}catch{return '';}}
export const lensDevWorlds:TabLens={
 id:'dev-worlds',label:'Developer worlds',description:'GitHub, GitLab, code editors and docs.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>/github|gitlab|bitbucket|developer\.|localhost|docs\.|stackoverflow/.test(host(t.url)));
 }
};

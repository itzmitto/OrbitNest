import type {TabLens} from '../core/types.ts';
/** Mail, messaging and meetings. */
function host(url:string):string{try{return new URL(url).hostname.toLowerCase();}catch{return '';}}
export const lensCommunicationWorlds:TabLens={
 id:'communication-worlds',label:'Communication worlds',description:'Mail, messaging and meetings.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>/mail|discord|slack|teams|outlook|zoom|chat/.test(host(t.url)));
 }
};

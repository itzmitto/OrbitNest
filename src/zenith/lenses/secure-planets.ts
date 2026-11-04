import type {TabLens} from '../core/types.ts';
/** HTTPS websites accessed with TLS. */
export const lensSecurePlanets:TabLens={
 id:'secure-planets',label:'Secure planets',description:'HTTPS websites accessed with TLS.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.url.startsWith('https://'));
 }
};

import type {TabLens} from '../core/types.ts';
/** HTTP websites to review. */
export const lensInsecurePlanets:TabLens={
 id:'insecure-planets',label:'Unencrypted planets',description:'HTTP websites to review.',
 select(tabs){
  const copy=tabs.slice();
  return copy.filter(t=>t.url.startsWith('http://'));
 }
};

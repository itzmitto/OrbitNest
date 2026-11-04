import type {Signal} from '../core/types.ts';
/** Number of unique star systems currently open */
function host(url:string):string{try{return new URL(url).hostname;}catch{return 'local';}}
export const signalDomainDiversity:Signal={
 id:'domain-diversity',label:'Domain diversity',description:'Number of unique star systems currently open',
 calculate(tabs){
  const value=new Set(tabs.map(t=>host(t.url))).size;
  return {value,unit:'',detail:'Number of unique star systems currently open'};
 }
};

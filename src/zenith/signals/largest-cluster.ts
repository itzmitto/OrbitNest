import type {BrowserTab,Signal} from '../core/types.ts';
/** Maximum tabs from the same domain */
function host(url:string):string{try{return new URL(url).hostname;}catch{return 'local';}}
function largest(tabs:BrowserTab[]):number{const counts=new Map<string,number>();
 for(const tab of tabs){const key=host(tab.url);counts.set(key,(counts.get(key)||0)+1);}
 return Math.max(0,...counts.values());}
export const signalLargestCluster:Signal={
 id:'largest-cluster',label:'Largest system',description:'Maximum tabs from the same domain',
 calculate(tabs){
  const value=largest(tabs);
  return {value,unit:'',detail:'Maximum tabs from the same domain'};
 }
};

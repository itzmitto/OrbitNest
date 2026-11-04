import type {Signal} from '../core/types.ts';
/** Share of all tabs on encrypted HTTPS */
function percent(n:number,total:number):number{return total?Math.round(n/total*100):0;}
export const signalSecureShare:Signal={
 id:'secure-share',label:'Secure browsing',description:'Share of all tabs on encrypted HTTPS',
 calculate(tabs){
  const value=percent(tabs.filter(t=>t.url.startsWith("https://")).length,tabs.length);
  return {value,unit:'%',detail:'Share of all tabs on encrypted HTTPS'};
 }
};

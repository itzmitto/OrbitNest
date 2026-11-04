import type {Signal} from '../core/types.ts';
/** Unencrypted web URLs to review */
export const signalPlainHttp:Signal={
 id:'plain-http',label:'HTTP exposure',description:'Unencrypted web URLs to review',
 calculate(tabs){
  const value=tabs.filter(t=>t.url.startsWith("http://")).length;
  return {value,unit:'',detail:'Unencrypted web URLs to review'};
 }
};

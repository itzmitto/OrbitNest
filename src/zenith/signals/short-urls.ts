import type {Signal} from '../core/types.ts';
/** Short and easy-to-read website addresses */
export const signalShortUrls:Signal={
 id:'short-urls',label:'Short addresses',description:'Short and easy-to-read website addresses',
 calculate(tabs){
  const value=tabs.filter(t=>t.url.length<45&&/^https?:\/\//.test(t.url)).length;
  return {value,unit:'',detail:'Short and easy-to-read website addresses'};
 }
};

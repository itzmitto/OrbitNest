import type {Signal} from '../core/types.ts';
/** Internal browser pages and special schemes */
export const signalLocalCount:Signal={
 id:'local-count',label:'Local pages',description:'Internal browser pages and special schemes',
 calculate(tabs){
  const value=tabs.filter(t=>!/^https?:\/\//.test(t.url)).length;
  return {value,unit:'',detail:'Internal browser pages and special schemes'};
 }
};

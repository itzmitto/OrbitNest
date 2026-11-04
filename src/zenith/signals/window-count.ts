import type {Signal} from '../core/types.ts';
/** Distinct browser windows containing tabs */
export const signalWindowCount:Signal={
 id:'window-count',label:'Open windows',description:'Distinct browser windows containing tabs',
 calculate(tabs){
  const value=new Set(tabs.map(t=>t.windowId)).size;
  return {value,unit:'',detail:'Distinct browser windows containing tabs'};
 }
};

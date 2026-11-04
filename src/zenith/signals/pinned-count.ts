import type {Signal} from '../core/types.ts';
/** Deliberately preserved tab shortcuts */
export const signalPinnedCount:Signal={
 id:'pinned-count',label:'Pinned planets',description:'Deliberately preserved tab shortcuts',
 calculate(tabs){
  const value=tabs.filter(t=>t.pinned).length;
  return {value,unit:'',detail:'Deliberately preserved tab shortcuts'};
 }
};

import type {Signal} from '../core/types.ts';
/** Memory-saving discarded tabs */
export const signalDiscardedCount:Signal={
 id:'discarded-count',label:'Sleeping planets',description:'Memory-saving discarded tabs',
 calculate(tabs){
  const value=tabs.filter(t=>t.discarded).length;
  return {value,unit:'',detail:'Memory-saving discarded tabs'};
 }
};

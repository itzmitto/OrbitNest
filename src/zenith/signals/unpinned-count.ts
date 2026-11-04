import type {Signal} from '../core/types.ts';
/** Tabs not pinned to the browser */
export const signalUnpinnedCount:Signal={
 id:'unpinned-count',label:'Temporary planets',description:'Tabs not pinned to the browser',
 calculate(tabs){
  const value=tabs.filter(t=>!t.pinned).length;
  return {value,unit:'',detail:'Tabs not pinned to the browser'};
 }
};

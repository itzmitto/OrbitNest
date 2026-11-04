import type {Signal} from '../core/types.ts';
/** Tabs with their sound turned off */
export const signalMutedCount:Signal={
 id:'muted-count',label:'Muted worlds',description:'Tabs with their sound turned off',
 calculate(tabs){
  const value=tabs.filter(t=>t.muted).length;
  return {value,unit:'',detail:'Tabs with their sound turned off'};
 }
};

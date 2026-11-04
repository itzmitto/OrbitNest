import type {Signal} from '../core/types.ts';
/** Foreground tabs across all windows */
export const signalForegroundCount:Signal={
 id:'foreground-count',label:'Active planets',description:'Foreground tabs across all windows',
 calculate(tabs){
  const value=tabs.filter(t=>t.active).length;
  return {value,unit:'',detail:'Foreground tabs across all windows'};
 }
};

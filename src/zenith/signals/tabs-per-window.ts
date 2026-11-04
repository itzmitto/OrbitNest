import type {Signal} from '../core/types.ts';
/** Average constellation density by browser window */
export const signalTabsPerWindow:Signal={
 id:'tabs-per-window',label:'Tabs per window',description:'Average constellation density by browser window',
 calculate(tabs){
  const value=Math.round(tabs.length/Math.max(1,new Set(tabs.map(t=>t.windowId)).size)*10)/10;
  return {value,unit:'',detail:'Average constellation density by browser window'};
 }
};

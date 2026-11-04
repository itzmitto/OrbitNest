import type {Signal} from '../core/types.ts';
/** Share of tabs not in the foreground */
function percent(n:number,total:number):number{return total?Math.round(n/total*100):0;}
export const signalBackgroundShare:Signal={
 id:'background-share',label:'Background occupancy',description:'Share of tabs not in the foreground',
 calculate(tabs){
  const value=percent(tabs.filter(t=>!t.active).length,tabs.length);
  return {value,unit:'%',detail:'Share of tabs not in the foreground'};
 }
};

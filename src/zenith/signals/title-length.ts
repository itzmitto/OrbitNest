import type {Signal} from '../core/types.ts';
/** Mean length of open tab titles */
export const signalTitleLength:Signal={
 id:'title-length',label:'Title complexity',description:'Mean length of open tab titles',
 calculate(tabs){
  const value=Math.round(tabs.reduce((sum,t)=>sum+t.title.length,0)/Math.max(1,tabs.length));
  return {value,unit:' chars',detail:'Mean length of open tab titles'};
 }
};

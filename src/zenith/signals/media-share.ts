import type {Signal} from '../core/types.ts';
/** Proportion of streaming and media tabs */
function host(url:string):string{try{return new URL(url).hostname;}catch{return 'local';}}
function percent(n:number,total:number):number{return total?Math.round(n/total*100):0;}
export const signalMediaShare:Signal={
 id:'media-share',label:'Media presence',description:'Proportion of streaming and media tabs',
 calculate(tabs){
  const value=percent(tabs.filter(t=>/youtube|spotify|twitch|netflix|vimeo/.test(host(t.url))).length,tabs.length);
  return {value,unit:'%',detail:'Proportion of streaming and media tabs'};
 }
};

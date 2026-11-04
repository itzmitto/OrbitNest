import type {Signal} from '../core/types.ts';
/** Tabs currently making sound */
export const signalAudioCount:Signal={
 id:'audio-count',label:'Playing audio',description:'Tabs currently making sound',
 calculate(tabs){
  const value=tabs.filter(t=>t.audible).length;
  return {value,unit:'',detail:'Tabs currently making sound'};
 }
};

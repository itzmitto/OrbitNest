import type {TabRecord} from './tab';
export function filterByWindow(tabs:readonly TabRecord[],windowId:number|null):TabRecord[] {
  return windowId===null?[...tabs]:tabs.filter(tab=>tab.windowId===windowId);
}
export function parseWindowSelection(value:string,allowed:readonly number[]):number|null {
  if(value==='all')return null;
  if(!/^\d+$/.test(value))return null;
  const id=Number(value);
  return allowed.includes(id)?id:null;
}

import type { TabRecord } from '../tab';
/** If a selected tab closes, fall back to the active tab without guessing an ID. */
export function retainedSelection(tabs:readonly TabRecord[],selected:number|null):number|null{
  if(selected!==null&&tabs.some(t=>t.id===selected))return selected;
  return tabs.find(t=>t.active)?.id??tabs[0]?.id??null;
}

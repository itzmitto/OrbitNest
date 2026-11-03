import { loadTabs, activateTab } from '../mission/browser';
import type { StudioTab } from './types';
export async function loadStudioTabs():Promise<{tabs:StudioTab[];isDemo:boolean}>{return loadTabs();}
export async function activateStudioTab(tab:StudioTab):Promise<void>{await activateTab(tab);}
type BrowserEvent={addListener:(cb:()=>void)=>void;removeListener?:(cb:()=>void)=>void};
type ChromeEvents={tabs?:{onCreated?:BrowserEvent;onUpdated?:BrowserEvent;onRemoved?:BrowserEvent;onMoved?:BrowserEvent}};
export function subscribeTabChanges(callback:()=>void):()=>void{const api=(globalThis as unknown as {chrome?:ChromeEvents}).chrome;const events=[api?.tabs?.onCreated,api?.tabs?.onUpdated,api?.tabs?.onRemoved,api?.tabs?.onMoved].filter((e):e is BrowserEvent=>e!==undefined);let pending=false;const refresh=()=>{if(pending)return;pending=true;queueMicrotask(()=>{pending=false;callback();});};for(const event of events)event.addListener(refresh);return()=>{for(const event of events)event.removeListener?.(refresh);};}

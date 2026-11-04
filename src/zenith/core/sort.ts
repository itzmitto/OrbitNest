import type {BrowserTab} from './types.ts';
import {formatHost} from './math.ts';
export type SortOrder='browser'|'title'|'domain'|'window'|'pinned'|'audio';
export const sortOptions:[SortOrder,string][]=[['browser','Browser order'],['title','Planet title'],['domain','Star system'],['window','Window number'],['pinned','Pinned first'],['audio','Playing audio first']];
export function sortTabs(input:BrowserTab[],mode:SortOrder):BrowserTab[]{const tabs=input.slice();
 switch(mode){case 'browser':return tabs.sort((a,b)=>a.windowId-b.windowId||a.index-b.index);
 case 'title':return tabs.sort((a,b)=>a.title.localeCompare(b.title));
 case 'domain':return tabs.sort((a,b)=>formatHost(a.url).localeCompare(formatHost(b.url)));
 case 'window':return tabs.sort((a,b)=>a.windowId-b.windowId||a.index-b.index);
 case 'pinned':return tabs.sort((a,b)=>Number(b.pinned)-Number(a.pinned)||a.title.localeCompare(b.title));
 case 'audio':return tabs.sort((a,b)=>Number(b.audible)-Number(a.audible)||a.title.localeCompare(b.title));}}

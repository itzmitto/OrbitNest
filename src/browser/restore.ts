import type { SessionSnapshot } from '../domain/session';
import { parseSession } from '../domain/session';
import { hasBrowserTabs } from './api';
export async function restoreSession(session:SessionSnapshot):Promise<{opened:number;failed:number}>{
  if(!hasBrowserTabs()||!parseSession(session))return {opened:0,failed:session.urls.length};
  let opened=0,failed=0;
  for(const url of session.urls){try{await chrome.tabs.create({url,active:false});opened++;}catch{failed++;}}
  return {opened,failed};
}

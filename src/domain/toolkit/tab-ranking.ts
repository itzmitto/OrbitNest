import type { TabRecord } from '../tab';
export function rankTab(tab: Pick<TabRecord,'title'|'domain'|'active'|'pinned'>,query:string):number {
  const q=query.trim().toLowerCase();
  if(!q)return Number(tab.active)*4+Number(tab.pinned)*2;
  const title=tab.title.toLowerCase(); const domain=tab.domain.toLowerCase();
  if(title===q)return 100;
  if(domain===q)return 90;
  if(title.startsWith(q))return 75;
  if(domain.startsWith(q))return 65;
  if(title.includes(q))return 40;
  if(domain.includes(q))return 30;
  return 0;
}

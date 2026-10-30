import type { TabRecord } from '../domain/tab';
import { TabIcon } from './TabIcon';
export function GalaxyList({ tabs, selected, onOpen }: { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void }) {
  return <div className="galaxy-list" role="list" aria-label="Open browser tabs">
    {tabs.map((tab) => <div className="galaxy-row" key={tab.id} role="listitem"><button className={'galaxy-link'+(selected===tab.id?' chosen':'')} onClick={() => onOpen(tab)}><TabIcon src={tab.favIconUrl} domain={tab.domain} /><span className="list-copy"><strong>{tab.title}</strong><small>{tab.domain} · Window {tab.windowId}</small></span><span className="list-action" aria-hidden="true">↗</span></button></div>)}
  </div>;
}

import type { TabRecord } from '../domain/tab';
export function TabStatus({ tab }: { tab: TabRecord }) {
  return <span className="tab-status">{tab.active&&<span className="status-current">ACTIVE</span>}{tab.pinned&&<span title="Pinned">PINNED</span>}{tab.audible&&<span title="Playing audio">AUDIO</span>}{tab.muted&&<span title="Muted">MUTED</span>}</span>;
}

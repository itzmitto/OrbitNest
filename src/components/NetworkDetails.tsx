import type { TabRecord } from '../domain/tab.ts';
import { inspectGraphPoint } from '../network/inspector.ts';
import type { GraphPoint } from '../network/types.ts';

type Props = { point: GraphPoint | undefined; onOpen: (tab: TabRecord) => void };
export function NetworkDetails({ point, onOpen }: Props) {
  const value = inspectGraphPoint(point);
  return <aside className="network-inspector" aria-live="polite" aria-label="Selected planet details">
    <div className="network-kicker">PLANET INSPECTOR</div>
    {value && point ? <>
      <strong className="network-inspector-title">{value.title}</strong>
      <p className="network-inspector-domain">{value.domain}</p>
      <dl><div><dt>Window</dt><dd>#{value.windowId}</dd></div><div><dt>Status</dt><dd>{value.active ? 'Active tab' : value.pinned ? 'Pinned' : value.audible ? 'Playing audio' : 'Open tab'}</dd></div></dl>
      <button type="button" onClick={() => onOpen(point.tab)}>Open existing tab ↗</button>
    </> : <p className="network-inspector-placeholder">Choose a world to see its tab metadata. No webpage contents are read.</p>}
  </aside>;
}

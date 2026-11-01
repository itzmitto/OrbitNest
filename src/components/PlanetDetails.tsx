import type { TabRecord } from '../domain/tab';
import { describePlanetTab } from '../domain/planet-details';
import { allowedPlanetActions } from '../domain/planet-actions';
type Props = { tab: TabRecord | undefined; onOpen: (tab: TabRecord) => void; demo: boolean; onPin: (tab: TabRecord) => void; onMute: (tab: TabRecord) => void; onClose: (tab: TabRecord) => void };
export function PlanetDetails({ tab, onOpen, demo, onPin, onMute, onClose }: Props) {
  if (!tab) return <aside className="world-detail" aria-label="Selected world details"><span>NO PLANET SELECTED</span><p>Hover a world or select a planet to inspect your destination.</p></aside>;
  const details = describePlanetTab(tab);
  const actions = allowedPlanetActions(tab, demo);
  return <aside className="world-detail" aria-label="Selected world details">
    <span>PLANET INTELLIGENCE · {details.windowLabel}</span>
    <strong title={details.title}>{details.title}</strong>
    <p>{details.domain} <b>·</b> {details.state}</p>
    <div className="world-detail-actions">
      <button type="button" onClick={() => onOpen(tab)}>Open tab ↗</button>
      {actions.canModify && <button type="button" onClick={() => onPin(tab)}>{tab.pinned ? 'Unpin' : 'Pin'}</button>}
      {actions.canMute && <button type="button" onClick={() => onMute(tab)}>{tab.muted ? 'Unmute' : 'Mute'}</button>}
      {actions.canClose && <button type="button" className="danger" onClick={() => onClose(tab)}>Close…</button>}
    </div>
  </aside>;
}

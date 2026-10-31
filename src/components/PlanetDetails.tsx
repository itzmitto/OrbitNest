import type { TabRecord } from '../domain/tab';
import { describePlanetTab } from '../domain/planet-details';
export function PlanetDetails({ tab, onOpen }: {tab: TabRecord | undefined; onOpen: (tab: TabRecord) => void}) {
  if (!tab) return <aside className="world-detail" aria-label="Selected world details"><span>NO PLANET SELECTED</span><p>Hover a world or select a planet to inspect your destination.</p></aside>;
  const details = describePlanetTab(tab);
  return <aside className="world-detail" aria-label="Selected world details">
    <span>PLANET INTELLIGENCE · {details.windowLabel}</span>
    <strong title={details.title}>{details.title}</strong>
    <p>{details.domain} <b>·</b> {details.state}</p>
    <button type="button" onClick={() => onOpen(tab)}>Open existing browser tab ↗</button>
  </aside>;
}

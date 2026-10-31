import { useMemo } from 'react';
import type { TabRecord } from '../domain/tab';
import { WORLD_NAMES, selectFeaturedWorlds } from '../graph/planet-catalog';

export function PlanetCatalog({ tabs, onOpen }: { tabs: TabRecord[]; onOpen: (tab: TabRecord) => void }) {
  const featured = useMemo(() => selectFeaturedWorlds(tabs), [tabs]);
  if (!featured.length) return null;
  return (
    <section className="planet-catalog" aria-labelledby="planet-catalog-title">
      <div className="planet-catalog-heading">
        <div><span className="kicker">STELLAR ATLAS / EXPLORE</span><h3 id="planet-catalog-title">Worlds worth discovering <span>✧</span></h3></div>
        <span className="catalog-count">{featured.length} FEATURED WORLDS</span>
      </div>
      <div className="planet-catalog-grid">
        {featured.map(world => (
          <button type="button" className="world-card" key={world.id} onClick={() => onOpen(world.tab)} aria-label={`Switch to ${world.title}, ${WORLD_NAMES[world.kind]}`}>
            <span className={`world-model world-model--${world.kind}`} aria-hidden="true"><i /></span>
            <span className="world-copy"><span className="world-type">{WORLD_NAMES[world.kind]}</span><strong title={world.title}>{world.domain}</strong><small title={world.title}>{world.title}</small></span>
            <span className="world-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

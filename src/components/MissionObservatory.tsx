import { useMemo, useState } from 'react';
import type { TabRecord } from '../domain/tab';
import { collectObservations } from '../observatory';
import { exportMissionReport } from '../observatory/export';

/** Browser-local aggregates only: no host calls, no URL collection. */
export function MissionObservatory({ tabs }: { tabs: readonly TabRecord[] }) {
  const [expanded, setExpanded] = useState(false);
  const observations = useMemo(() => collectObservations(tabs), [tabs]);
  const [category, setCategory] = useState('All');
  const [needle, setNeedle] = useState('');
  const categories = ['All', ...new Set(observations.map(item => item.category))];
  const filtered = (category === 'All' ? observations : observations.filter(item => item.category === category)).filter(item => (item.label + ' ' + item.detail).toLocaleLowerCase().includes(needle.toLocaleLowerCase().trim()));
  const visible = expanded ? filtered : filtered.slice(0, 6);
  return <section className="mission-observatory" aria-labelledby="mission-observatory-title">
    <header className="mission-observatory-heading">
      <div><span className="mission-kicker">DEEP SPACE INTELLIGENCE</span><h2 id="mission-observatory-title">Mission observatory</h2>
        <p>Private, live signals calculated from your browser tabs. Nothing is uploaded.</p></div>
      <span className="mission-observatory-count">{observations.length} SIGNALS</span>
    </header>
    <button className="mission-observatory-more" type="button" onClick={() => navigator.clipboard?.writeText(exportMissionReport(observations))}>Copy aggregate report</button>
    <label className="mission-filter-control">Signal category <select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(value => <option key={value}>{value}</option>)}</select></label>
    <label className="mission-filter-control">Find signals <input type="search" value={needle} onChange={event => setNeedle(event.target.value)} placeholder="Find a metric..." /></label>
    <div className="mission-observatory-grid">
      {visible.map(item => <article key={item.id} className="mission-observatory-card" title={item.detail}>
        <span className="mission-observatory-kind">{item.category}</span><strong>{item.value}</strong><h3>{item.label}</h3>
        <p>{item.detail}</p>
      </article>)}
    </div>
    {filtered.length > 6 && <button type="button" className="mission-observatory-more" aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>
      {expanded ? 'Show fewer signals' : `Explore all ${filtered.length} signals`}
    </button>}
  </section>;
}

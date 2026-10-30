const milestones = [
  { number: '01', title: 'Workspace', detail: 'React · TypeScript · Vite', current: true },
  { number: '02', title: 'Extension foundation', detail: 'Chrome / Edge · Manifest V3', current: false },
  { number: '03', title: 'Tab universe', detail: 'Live nodes · Browser tabs API', current: false },
] as const;

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="OrbitNest home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-name">OrbitNest<span className="brand-dot">.</span></span>
          <span className="brand-divider" />
          <span className="brand-context">BROWSER TAB UNIVERSE</span>
        </div>
        <span className="build-label"><span className="status-dot" /> WORKSPACE v0.1</span>
      </header>
      <main className="main-layout">
        <section className="hero-copy" aria-labelledby="hero-title">
          <div className="eyebrow"><span className="eyebrow-line" /> AN EXPLORATION OF YOUR OPEN TABS</div>
          <h1 id="hero-title">Your tabs.<br /><span>Your universe.</span></h1>
          <p>OrbitNest turns scattered browser tabs into a living universe. Navigate, organize and rediscover your digital space.</p>
          <div className="hero-status"><span className="status-icon">✓</span><div><strong>Project initialized</strong><span>The universe view is a design preview. Live tabs arrive in later pull requests.</span></div></div>
        </section>
        <section className="orbit-showcase" aria-label="Decorative preview of a future tab universe">
          <div className="space-field">
            <div className="orbit orbit--outer" />
            <div className="orbit orbit--mid" />
            <div className="orbit orbit--inner" />
            <div className="glow glow--blue" />
            <div className="glow glow--teal" />
            <div className="central-planet"><div className="planet-shine" /><span className="core-ring" /></div>
            <div className="satellite satellite--one"><span>DEV</span></div>
            <div className="satellite satellite--two"><span>WEB</span></div>
            <div className="satellite satellite--three"><span>APP</span></div>
            <div className="satellite satellite--four" />
            <div className="space-caption"><span className="caption-indicator" /> UNIVERSE / CONCEPT PREVIEW</div>
          </div>
        </section>
      </main>
      <section className="milestones" aria-labelledby="milestones-heading">
        <div className="milestones-intro"><span className="section-kicker">FLIGHT PLAN</span><h2 id="milestones-heading">Building the universe,<br />one orbit at a time.</h2></div>
        <div className="milestone-list">
          {milestones.map((milestone) => (
            <article className={`milestone ${milestone.current ? 'milestone--active' : ''}`} key={milestone.number}>
              <span className="milestone-number">{milestone.number}</span>
              <div className="milestone-content"><h3>{milestone.title}</h3><p>{milestone.detail}</p></div>
              <span className="milestone-symbol" aria-hidden="true">{milestone.current ? '✓' : '↗'}</span>
            </article>
          ))}
        </div>
      </section>
      <footer><span>ORBITNEST / YOUR TABS. YOUR UNIVERSE.</span><span>Built in small, meaningful pull requests.</span></footer>
    </div>
  );
}

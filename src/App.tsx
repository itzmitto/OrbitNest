import { useEffect, useRef, useState } from 'react';
import { Brand } from './components/Brand';
import { TabIcon } from './components/TabIcon';
import { TabStatus } from './components/TabStatus';
import { GalaxyList } from './components/GalaxyList';
import { UniverseCanvas } from './components/UniverseCanvas';
import { QuickSwitch } from './components/QuickSwitch';
import { useBrowserTabs } from './hooks/useBrowserTabs';
import { useFavorites } from './hooks/useFavorites';
import { useSessions } from './hooks/useSessions';
import { useShortcuts } from './hooks/useShortcuts';
import { restoreSession } from './browser/restore';
import type { GroupMode, SortMode, TabRecord } from './domain/tab';
import { focusBrowserTab, closeBrowserTab, toggleMuted, togglePinned } from './browser/actions';
import { searchTabs } from './domain/search';
import { groupTabs } from './domain/group';
import { sortTabs } from './domain/sort';
import { duplicateTabIds } from './domain/duplicates';
import { makeTabMap } from './domain/tab-map';
import { filterByTabState, parseQuickTabFilter } from './domain/quick-tab-filter';
import { filterByWindow, parseWindowSelection } from './domain/window-filter';

const illustration = '✧';

function Stat({ icon, label, value, hint }: { icon: string; label: string; value: number | string; hint: string }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top"><span>{label}</span><span className="stat-icon" aria-hidden="true">{icon}</span></div>
      <strong>{value}</strong><small>{hint}</small>
    </div>
  );
}

export default function App() {
  const { tabs, demo, loading, error } = useBrowserTabs();
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const { sessions, save: saveSession, remove: removeSession } = useSessions();
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('window');
  const [group, setGroup] = useState<GroupMode>('none');
  const [duplicatesOnly, setDuplicatesOnly] = useState(false);
  const [stateFilter,setStateFilter]=useState(parseQuickTabFilter('all'));
  const [windowFilter,setWindowFilter]=useState<number|null>(null);
  const windowIds=Array.from(new Set(tabs.map(tab=>tab.windowId))).sort((a,b)=>a-b);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [view, setView] = useState<'universe' | 'list' | 'cards'>('universe');
  const [copyResult, setCopyResult] = useState('');
  const [quickSwitchOpen, setQuickSwitchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const duplicateIds = duplicateTabIds(tabs);
  const visibleTabs = sortTabs(filterByWindow(filterByTabState(searchTabs(tabs, query),stateFilter),windowFilter), sort).filter(tab =>
    (!favoritesOnly || favorites.includes(tab.id)) && (!duplicatesOnly || duplicateIds.has(tab.id))
  );
  const groups = groupTabs(visibleTabs, group);
  const selectedTab = tabs.find(tab => tab.id === selected);
  const domains = new Set(tabs.map(tab => tab.domain)).size;
  const windows = new Set(tabs.map(tab => tab.windowId)).size;
  const activeTab = tabs.find(tab => tab.active);

  useShortcuts(
    () => searchRef.current?.focus(),
    () => setView('list'),
    () => setView('universe')
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setQuickSwitchOpen(value => !value);
      }
    };
    document.addEventListener('keydown',onKeyDown);
    return () => document.removeEventListener('keydown',onKeyDown);
  }, []);

  function openTab(tab: TabRecord) {
    setSelected(tab.id);
    if (!demo) void focusBrowserTab(tab.id, tab.windowId);
  }

  async function copyTabMap() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(makeTabMap(tabs));
      setCopyResult('Map copied locally');
    } catch {
      setCopyResult('Clipboard access unavailable');
    }
  }

  function requestClose(tab: TabRecord) {
    if (!demo && window.confirm(`Close tab “${tab.title}”?`)) void closeBrowserTab(tab.id);
  }

  return (
    <div className="universe-app">
      <header className="dashboard-top">
        <Brand />
        <div className="top-right">
          <span className="live-indicator"><i />{demo ? 'DEMO UNIVERSE' : 'BROWSER CONNECTED'}</span>
          <span className="top-divider" aria-hidden="true" />
          <span className="avatar" title="Local browser workspace">ON</span>
        </div>
      </header>
      <div className="workspace-grid">
        <aside className="sidebar" aria-label="Workspace navigation">
          <div className="sidebar-heading">WORKSPACE</div>
          <div className="nav-item active"><span className="nav-glyph">◎</span><span>My universe</span><span className="nav-arrow">↗</span></div>
          <div className="nav-item muted"><span className="nav-glyph">◈</span><span>Tab network</span><span className="nav-count">{tabs.length}</span></div>
          <div className="sidebar-divider" />
          <div className="sidebar-heading">YOUR SOLAR SYSTEM</div>
          <div className="sidebar-system">
            <span className="solar-illustration" aria-hidden="true"><i /><b /><em /></span>
            <strong>Everything in orbit.</strong>
            <p>Every browser tab is a world of its own. Find your next destination in a single glance.</p>
            <div className="sidebar-metrics"><span><i /> Live tab sync</span><span><i /> Private by design</span></div>
          </div>
          <div className="sidebar-foot"><span className="sidebar-signal" /> ORBITNEST <span>V0.3</span></div>
        </aside>
        <main className="workspace">
          <div className="workspace-intro">
            <div className="hero-copy">
              <div className="kicker"><span className="kicker-line" /> MISSION CONTROL <span className="kicker-slash">/</span> YOUR SPACE</div>
              <h1>Your browser.<br /><em>A whole universe.</em></h1>
              <p>Turn a constellation of open tabs into something extraordinary. Explore, organize and jump between worlds.</p>
              <div className="hero-highlights"><span>✦ LIVE GALAXY</span><span>◌ LOCAL FIRST</span><span>◎ 3D EXPLORER</span></div>
            </div>
            <div className="hero-actions"><span className="count-pill"><i /> {tabs.length} planets discovered</span><button className="save-session" type="button" onClick={() => saveSession(tabs)}>＋ Save this universe</button><button className="copy-map" type="button" onClick={() => void copyTabMap()}>⇧ Copy tab map</button><span className="copy-feedback" role="status">{copyResult}</span></div>
          </div>
          {error && <p className="error-alert" role="alert">{error}</p>}
          <div className="stats" aria-label="Workspace statistics">
            <Stat icon="◉" label="TOTAL PLANETS" value={tabs.length} hint="Tabs in your browser" />
            <Stat icon="▣" label="SOLAR SYSTEMS" value={windows} hint="Browser windows" />
            <Stat icon="✧" label="CONSTELLATIONS" value={domains} hint="Unique destinations" />
          </div>
          <section className="panel" aria-labelledby="explorer-title">
            <div className="panel-title">
              <div className="panel-heading"><span className="kicker">THE OBSERVATORY <span className="kicker-slash">/</span> EXPLORE</span><h2 id="explorer-title">Universe explorer <span className="title-star">✦</span></h2><p>Discover every open world, right where you left it.</p></div>
              <div className="view-toggle" role="group" aria-label="Choose tab visualization">
                <button aria-pressed={view === 'universe'} type="button" onClick={() => setView('universe')}><span>◉</span> Universe</button>
                <button aria-pressed={view === 'cards'} type="button" onClick={() => setView('cards')}><span>▦</span> Cards</button>
                <button aria-pressed={view === 'list'} type="button" onClick={() => setView('list')}><span>☷</span> List</button>
              </div>
            </div>
            <div className="explorer-toolbar">
              <label className="search-box"><span aria-hidden="true">⌕</span><input ref={searchRef} type="search" aria-label="Search tabs" placeholder="Search stars, titles or websites…" value={query} onChange={event => setQuery(event.target.value)} /><kbd>/</kbd></label>
              <label className="select-box"><span>GROUP</span><select aria-label="Group tabs" value={group} onChange={event => setGroup(event.target.value as GroupMode)}><option value="none">All tabs</option><option value="window">Window</option><option value="domain">Domain</option></select></label>
              <label className="select-box"><span>SORT</span><select aria-label="Sort tabs" value={sort} onChange={event => setSort(event.target.value as SortMode)}><option value="window">Tab order</option><option value="title">Title A–Z</option><option value="domain">Domain A–Z</option></select></label>
              <label className="select-box"><span>WINDOW</span><select aria-label="Browser window filter" value={windowFilter!==null&&windowIds.includes(windowFilter)?String(windowFilter):'all'} onChange={event=>setWindowFilter(parseWindowSelection(event.target.value,windowIds))}><option value="all">All windows</option>{windowIds.map((id,index)=><option value={id} key={id}>Window {index+1}</option>)}</select></label>
              <label className="select-box"><span>STATUS</span><select aria-label="Tab status filter" value={stateFilter} onChange={event=>setStateFilter(parseQuickTabFilter(event.target.value))}><option value="all">Any status</option><option value="pinned">Pinned</option><option value="audible">Playing audio</option><option value="active">Active tab</option></select></label>
              <label className="filter-toggle"><input type="checkbox" checked={favoritesOnly} onChange={event => setFavoritesOnly(event.target.checked)} /><span>☆ Favorites</span></label>
              <label className="filter-toggle"><input type="checkbox" checked={duplicatesOnly} onChange={event => setDuplicatesOnly(event.target.checked)} /><span>Duplicates <small>{duplicateIds.size}</small></span></label>
            </div>
            {view === 'universe' ? <UniverseCanvas tabs={visibleTabs} selected={selected} onOpen={openTab} /> :
              view === 'list' ? groups.map(item => <section className="tab-group" key={item.key}><h3>{item.name} <small>{item.tabs.length}</small></h3><GalaxyList tabs={item.tabs} selected={selected} onOpen={openTab} /></section>) :
              groups.map(item => <section className="tab-group" key={item.key}>{item.name !== 'All tabs' && <h3>{item.name} <small>{item.tabs.length}</small></h3>}
                <div className="tab-grid">{item.tabs.map(tab => <div className="tile-wrap" key={tab.id}>
                  <button className={'tab-tile' + (tab.id === selected ? ' selected' : '')} type="button" onClick={() => openTab(tab)}><TabIcon src={tab.favIconUrl} domain={tab.domain} /><strong>{tab.title}</strong><small>{tab.domain}</small><TabStatus tab={tab} /></button>
                  <button type="button" className="favorite-btn" aria-label={favorites.includes(tab.id) ? `Remove favorite ${tab.title}` : `Favorite ${tab.title}`} aria-pressed={favorites.includes(tab.id)} onClick={() => toggleFavorite(tab.id)}>{favorites.includes(tab.id) ? '★' : '☆'}</button>
                  {!demo && <><button type="button" className="pin-btn" aria-label={tab.pinned ? `Unpin ${tab.title}` : `Pin ${tab.title}`} onClick={() => void togglePinned(tab.id, !tab.pinned)}>{tab.pinned ? '◆' : '◇'}</button>
                    <button type="button" className="mute-btn" aria-label={tab.muted ? `Unmute ${tab.title}` : `Mute ${tab.title}`} onClick={() => void toggleMuted(tab.id, !tab.muted)}>{tab.muted ? '◌' : '♫'}</button>
                    <button type="button" className="close-btn" aria-label={`Close ${tab.title}`} onClick={() => requestClose(tab)}>×</button></>}
                </div>)}</div>
              </section>)}
            {visibleTabs.length === 0 && !loading && <p className="empty-state">No planets found in this sector. Try another search or filter.</p>}
          </section>
          <div className="lower-panels">
            <section className="sessions-panel" aria-labelledby="sessions-heading"><div className="section-title"><div><span className="kicker">TIME CAPSULE</span><h2 id="sessions-heading">Saved universes</h2></div><span className="section-number">{sessions.length.toString().padStart(2, '0')}</span></div>
              {sessions.length === 0 ? <p className="empty-sessions"><span aria-hidden="true">◌</span> No saved sessions yet. Capture your current universe to return to these tabs later.</p> : sessions.map((session, index) =>
                <div className="session-row" key={`${session.savedAt}-${index}`}><span><strong>{session.name}</strong><small>{session.urls.length} tabs · {new Date(session.savedAt).toLocaleDateString()}</small></span><div className="session-actions">
                  {!demo && <button type="button" onClick={() => { if (window.confirm(`Open ${session.urls.length} tabs from “${session.name}”?`)) void restoreSession(session).then(result => window.alert(`Opened ${result.opened} tabs; ${result.failed} failed.`)); }}>Restore</button>}
                  <button type="button" onClick={() => removeSession(index)} aria-label={`Remove session ${session.name}`}>Remove</button>
                </div></div>)}
            </section>
            <section className="signal-panel" aria-label="Connection details"><div className="section-title"><div><span className="kicker">MISSION STATUS</span><h2>All systems in orbit</h2></div><span className="signal-orb">{illustration}</span></div><div className="signal-row"><span>Browser connection</span><strong><i /> {demo ? 'Preview' : 'Connected'}</strong></div><div className="signal-row"><span>Active destination</span><strong title={activeTab?.title ?? 'None'}>{activeTab?.domain ?? 'None'}</strong></div><div className="signal-row"><span>Data storage</span><strong>On this device</strong></div><div className="signal-note">Your universe stays yours. OrbitNest reads tab metadata, never webpage contents.</div></section>
          </div>
          <button className="quick-switch-trigger" type="button" onClick={() => setQuickSwitchOpen(true)}>⌘ Quick switch <kbd>Ctrl K</kbd></button>
          <footer className="workspace-footer"><span>© ORBITNEST · YOUR TABS, YOUR UNIVERSE.</span><span>SEARCH <kbd>/</kbd> · LIST <kbd>L</kbd> · UNIVERSE <kbd>G</kbd></span><span>{selectedTab ? `FOCUSED: ${selectedTab.domain}` : 'READY TO EXPLORE'}</span></footer>
          {loading && <span className="sr-only" role="status">Scanning browser tabs</span>}
        </main>
      </div>
      {quickSwitchOpen && <QuickSwitch tabs={tabs} onOpen={openTab} onClose={() => setQuickSwitchOpen(false)} />}
    </div>
  );
}

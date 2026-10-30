import { useState } from 'react';
import { Brand } from './components/Brand';
import { TabIcon } from './components/TabIcon';
import { TabStatus } from './components/TabStatus';
import { GalaxyList } from './components/GalaxyList';
import { UniverseCanvas } from './components/UniverseCanvas';
import { useBrowserTabs } from './hooks/useBrowserTabs';
import { useFavorites } from './hooks/useFavorites';
import { useSessions } from './hooks/useSessions';
import { useShortcuts } from './hooks/useShortcuts';
import { useRef } from 'react';
import { restoreSession } from './browser/restore';
import type { TabRecord } from './domain/tab';
import { focusBrowserTab, closeBrowserTab, toggleMuted, togglePinned } from './browser/actions';
import { searchTabs } from './domain/search';
import { groupTabs } from './domain/group';
import { sortTabs } from './domain/sort';
import { duplicateTabIds } from './domain/duplicates';
import type { SortMode } from './domain/tab';
import type { GroupMode } from './domain/tab';
export default function App() {
  const { tabs, demo, loading, error } = useBrowserTabs();
  const [selected, setSelected] = useState<number | null>(null);
  const { favorites, toggle: toggleFavorite }=useFavorites();
  const {sessions,save:saveSession,remove:removeSession}=useSessions();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('window');
  const [duplicatesOnly,setDuplicatesOnly]=useState(false);
  const duplicateIds=duplicateTabIds(tabs);
  const [favoritesOnly,setFavoritesOnly]=useState(false);
  const visibleTabs = sortTabs(searchTabs(tabs, query), sort).filter(t=>(!favoritesOnly||favorites.includes(t.id))&&(!duplicatesOnly||duplicateIds.has(t.id)));
  const [group, setGroup] = useState<GroupMode>('none');
  const groups = groupTabs(visibleTabs, group);
  const [view, setView] = useState<'universe'|'list'>('universe');
  const [graph, setGraph] = useState(true);
  const searchRef=useRef<HTMLInputElement>(null);
  useShortcuts(()=>searchRef.current?.focus(),()=>{setView('list');setGraph(false);},()=>{setView('universe');setGraph(true);});
  const selectedTab: TabRecord | undefined = tabs.find((tab) => tab.id === selected);
  const requestClose = (tab: TabRecord) => { if (!demo && window.confirm(`Close tab \"${tab.title}\"?`)) void closeBrowserTab(tab.id); };
  const openTab = (tab: TabRecord) => { setSelected(tab.id); void focusBrowserTab(tab.id, tab.windowId); };
  return <div className="universe-app">
    <header className="dashboard-top"><Brand /><div className="top-right"><span className="live-indicator"><i />{demo ? 'DEMO MODE' : 'LIVE CONNECTION'}</span><span className="avatar">ON</span></div></header>
    <div className="workspace-grid">
      <aside className="sidebar"><div className="sidebar-heading">NAVIGATION</div><div className="nav-item active">✦ <span>Universe overview</span></div><div className="sidebar-heading below">YOUR WORKSPACE</div><div className="sidebar-info">Every open tab becomes part of your orbit. Your data stays in your browser.</div><div className="sidebar-foot">ORBITNEST · LOCAL FIRST</div></aside>
      <main className="workspace"><div className="workspace-intro"><div><div className="kicker">CONTROL CENTER / UNIVERSE</div><h1>Explore your <em>universe.</em></h1><p>All your tabs, beautifully organized in one place.</p></div><div className="intro-actions"><span className="count-pill">{tabs.length} planets discovered</span><button className="save-session" onClick={()=>saveSession(tabs)}>Save session</button></div></div>
        {error && <p className="error-alert" role="alert">{error}</p>}
        <div className="stats"><div className="stat-card"><span>OPEN TABS</span><strong>{tabs.length}</strong><small>Across your workspace</small></div><div className="stat-card"><span>WINDOWS</span><strong>{new Set(tabs.map((t) => t.windowId)).size}</strong><small>Connected systems</small></div><div className="stat-card"><span>DOMAINS</span><strong>{new Set(tabs.map((t) => t.domain)).size}</strong><small>Unique destinations</small></div></div>
        <section className="panel"><div className="panel-title"><div><span className="kicker">DISCOVERY GRID</span><h2>Tab explorer</h2></div><div className="explorer-tools"><label className="favorites-filter"><input type="checkbox" checked={duplicatesOnly} onChange={event=>setDuplicatesOnly(event.target.checked)} /> Duplicates ({duplicateIds.size})</label><label className="favorites-filter"><input type="checkbox" checked={favoritesOnly} onChange={event=>setFavoritesOnly(event.target.checked)} /> ★ Favorites</label><select aria-label="Sort tabs" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="window">Tab order</option><option value="title">Title A–Z</option><option value="domain">Domain A–Z</option></select><select aria-label="Group tabs" value={group} onChange={(event) => setGroup(event.target.value as GroupMode)}><option value="none">All tabs</option><option value="window">By window</option><option value="domain">By domain</option></select><input ref={searchRef} type="search" aria-label="Search tabs" placeholder="Search title or website..." value={query} onChange={(event) => setQuery(event.target.value)} /><button className="graph-toggle" aria-pressed={graph} onClick={() => setGraph(!graph)}>{graph ? 'Card view' : '3D Universe'}</button><div className="view-toggle" role="group" aria-label="Choose view"><button aria-pressed={view==='universe'} onClick={() => setView('universe')}>Grid</button><button aria-pressed={view==='list'} onClick={() => setView('list')}>List</button></div></div><span className="panel-meta">{loading ? 'Scanning...' : demo ? 'Interactive sample tabs · install the extension for live data' : 'Live tabs'}</span></div>{graph && view==='universe' ? <UniverseCanvas tabs={visibleTabs} selected={selected} onOpen={openTab} /> : view==='list' ? groups.map((group) => <section className="tab-group" key={group.key}><h3>{group.name} <small>{group.tabs.length}</small></h3><GalaxyList tabs={group.tabs} selected={selected} onOpen={openTab} /></section>) : groups.map((group) => <section className="tab-group" key={group.key}>{group.name!=='All tabs'&&<h3>{group.name} <small>{group.tabs.length}</small></h3>}<div className="tab-grid">{group.tabs.map((tab) => <div className="tile-wrap" key={tab.id}><button className={'tab-tile'+(tab.id===selected?' selected':'')} key={tab.id} onClick={() => openTab(tab)}><TabIcon src={tab.favIconUrl} domain={tab.domain} /><strong>{tab.title}</strong><small>{tab.domain}</small><TabStatus tab={tab} /></button><button type="button" className="favorite-btn" aria-label={favorites.includes(tab.id)?`Remove favorite ${tab.title}`:`Favorite ${tab.title}`} aria-pressed={favorites.includes(tab.id)} onClick={()=>toggleFavorite(tab.id)}>{favorites.includes(tab.id)?'★':'☆'}</button>{!demo&&<button type="button" className="pin-btn" aria-label={tab.pinned?`Unpin ${tab.title}`:`Pin ${tab.title}`} onClick={()=>void togglePinned(tab.id,!tab.pinned)}>{tab.pinned?'◆':'◇'}</button>}{!demo&&<button type="button" className="mute-btn" aria-label={tab.muted?`Unmute ${tab.title}`:`Mute ${tab.title}`} onClick={()=>void toggleMuted(tab.id,!tab.muted)}>{tab.muted?'◌':'♫'}</button>}{!demo&&<button type="button" className="close-btn" aria-label={`Close ${tab.title}`} onClick={()=>requestClose(tab)}>×</button>}</div>)}</div></section>)}{visibleTabs.length===0&&!loading&&<p className="empty-state">No tabs found in this browser window.</p>}</section>
        <section className="sessions-panel"><h2>Saved sessions <small>{sessions.length} locally saved</small></h2>{sessions.length===0?<p>No sessions saved yet.</p>:sessions.map((session,index)=><div className="session-row" key={`${session.savedAt}-${index}`}><span><strong>{session.name}</strong><small>{session.urls.length} web tabs · {new Date(session.savedAt).toLocaleDateString()}</small></span><div className="session-actions">{!demo&&<button onClick={()=>{if(window.confirm(`Open ${session.urls.length} tabs from \"${session.name}\"?`))void restoreSession(session).then(result=>window.alert(`Opened ${result.opened} tabs; ${result.failed} failed.`));}}>Restore</button>}<button onClick={()=>removeSession(index)} aria-label={`Remove session ${session.name}`}>Remove</button></div></div>)}</section><div className="shortcut-hint">KEYBOARD / Search <kbd>/</kbd> · Galaxy List <kbd>L</kbd> · Universe Graph <kbd>G</kbd></div><div className="selection-footer">{selectedTab ? `Selected: ${selectedTab.title}` : 'Select a planet to explore your tabs'} · {demo ? 'Preview only' : 'Chrome / Edge extension'}</div>
      </main>
    </div>
  </div>;
}

import { useState } from 'react';
import { Brand } from './components/Brand';
import { GalaxyList } from './components/GalaxyList';
import { useBrowserTabs } from './hooks/useBrowserTabs';
import type { TabRecord } from './domain/tab';
import { focusBrowserTab } from './browser/actions';
import { searchTabs } from './domain/search';
import { groupTabs } from './domain/group';
import type { GroupMode } from './domain/tab';
export default function App() {
  const { tabs, demo, loading, error } = useBrowserTabs();
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const visibleTabs = searchTabs(tabs, query);
  const [group, setGroup] = useState<GroupMode>('none');
  const groups = groupTabs(visibleTabs, group);
  const [view, setView] = useState<'universe'|'list'>('universe');
  const selectedTab: TabRecord | undefined = tabs.find((tab) => tab.id === selected);
  const openTab = (tab: TabRecord) => { setSelected(tab.id); void focusBrowserTab(tab.id, tab.windowId); };
  return <div className="universe-app">
    <header className="dashboard-top"><Brand /><div className="top-right"><span className="live-indicator"><i />{demo ? 'DEMO MODE' : 'LIVE CONNECTION'}</span><span className="avatar">ON</span></div></header>
    <div className="workspace-grid">
      <aside className="sidebar"><div className="sidebar-heading">NAVIGATION</div><div className="nav-item active">✦ <span>Universe overview</span></div><div className="sidebar-heading below">YOUR WORKSPACE</div><div className="sidebar-info">Every open tab becomes part of your orbit. Your data stays in your browser.</div><div className="sidebar-foot">ORBITNEST · LOCAL FIRST</div></aside>
      <main className="workspace"><div className="workspace-intro"><div><div className="kicker">CONTROL CENTER / UNIVERSE</div><h1>Explore your <em>universe.</em></h1><p>All your tabs, beautifully organized in one place.</p></div><span className="count-pill">{tabs.length} planets discovered</span></div>
        {error && <p className="error-alert" role="alert">{error}</p>}
        <div className="stats"><div className="stat-card"><span>OPEN TABS</span><strong>{tabs.length}</strong><small>Across your workspace</small></div><div className="stat-card"><span>WINDOWS</span><strong>{new Set(tabs.map((t) => t.windowId)).size}</strong><small>Connected systems</small></div><div className="stat-card"><span>DOMAINS</span><strong>{new Set(tabs.map((t) => t.domain)).size}</strong><small>Unique destinations</small></div></div>
        <section className="panel"><div className="panel-title"><div><span className="kicker">DISCOVERY GRID</span><h2>Tab explorer</h2></div><div className="explorer-tools"><select aria-label="Group tabs" value={group} onChange={(event) => setGroup(event.target.value as GroupMode)}><option value="none">All tabs</option><option value="window">By window</option><option value="domain">By domain</option></select><input type="search" aria-label="Search tabs" placeholder="Search title or website..." value={query} onChange={(event) => setQuery(event.target.value)} /><div className="view-toggle" role="group" aria-label="Choose view"><button aria-pressed={view==='universe'} onClick={() => setView('universe')}>Grid</button><button aria-pressed={view==='list'} onClick={() => setView('list')}>List</button></div></div><span className="panel-meta">{loading ? 'Scanning...' : demo ? 'Interactive sample tabs · install the extension for live data' : 'Live tabs'}</span></div>{view==='list' ? groups.map((group) => <section className="tab-group" key={group.key}><h3>{group.name} <small>{group.tabs.length}</small></h3><GalaxyList tabs={group.tabs} selected={selected} onOpen={openTab} /></section>) : groups.map((group) => <section className="tab-group" key={group.key}>{group.name!=='All tabs'&&<h3>{group.name} <small>{group.tabs.length}</small></h3>}<div className="tab-grid">{group.tabs.map((tab) => <button className={'tab-tile'+(tab.id===selected?' selected':'')} key={tab.id} onClick={() => openTab(tab)}><span className="tile-symbol">✧</span><strong>{tab.title}</strong><small>{tab.domain}</small></button>)}</div></section>)}{visibleTabs.length===0&&!loading&&<p className="empty-state">No tabs found in this browser window.</p>}</section>
        <div className="selection-footer">{selectedTab ? `Selected: ${selectedTab.title}` : 'Select a planet to explore your tabs'} · {demo ? 'Preview only' : 'Chrome / Edge extension'}</div>
      </main>
    </div>
  </div>;
}

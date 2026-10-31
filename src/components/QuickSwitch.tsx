import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TabRecord } from '../domain/tab';
import { quickSwitchResults } from '../domain/quick-switch';
export function QuickSwitch({ tabs, onOpen, onClose }: { tabs: TabRecord[]; onOpen: (tab: TabRecord) => void; onClose: () => void }) {
  const [query,setQuery] = useState('');
  const [highlight,setHighlight] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(()=>quickSwitchResults(tabs,query),[tabs,query]);
  useEffect(()=>{input.current?.focus();},[]);
  useEffect(()=>{setHighlight(0);},[query]);
  function choose(tab: TabRecord){onOpen(tab);onClose();}
  function handleKey(event: KeyboardEvent<HTMLDivElement>){
    if(event.key==='Escape'){event.preventDefault();onClose();}
    if(event.key==='ArrowDown'){event.preventDefault();setHighlight(i=>(i+1)%Math.max(1,results.length));}
    if(event.key==='ArrowUp'){event.preventDefault();setHighlight(i=>(i-1+Math.max(1,results.length))%Math.max(1,results.length));}
    if(event.key==='Enter'&&results[highlight]){event.preventDefault();choose(results[highlight]);}
  }
  return <div className="switch-overlay" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <div className="switch-dialog" role="dialog" aria-modal="true" aria-label="Quick switch browser tabs" onKeyDown={handleKey}>
      <div className="switch-header"><span>⌘</span><input ref={input} value={query} onChange={event=>setQuery(event.target.value)} placeholder="Jump to a planet…" aria-label="Search your open tabs" /><button type="button" onClick={onClose}>ESC</button></div>
      <div className="switch-results" role="listbox" aria-label="Matching browser tabs">
        {results.length ? results.map((tab,index)=><button role="option" aria-selected={highlight===index} type="button" key={tab.id} onMouseEnter={()=>setHighlight(index)} onClick={()=>choose(tab)}><span>◉</span><span><strong>{tab.title}</strong><small>{tab.domain}</small></span><span className="switch-enter">↵</span></button>) : <p>No matching planets.</p>}
      </div>
      <footer>↑↓ NAVIGATE · ENTER TO OPEN · ESC TO CLOSE</footer>
    </div>
  </div>;
}

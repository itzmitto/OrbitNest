import type { StudioTab, StudioNode, StudioEdge, StudioLayout } from './types';
import { fingerprint, nodeRadius } from './core/math.ts';
export function makeNodes(tabs:StudioTab[],layout:StudioLayout):StudioNode[]{return layout.place(tabs).map(p=>({...p,radius:nodeRadius(p.tab.active,p.tab.pinned,fingerprint(p.tab.domain))}));}
export function makeEdges(nodes:StudioNode[]):StudioEdge[]{const edges:StudioEdge[]=[],domain=new Map<string,number>(),window=new Map<number,number>();
for(const n of nodes){const d=domain.get(n.tab.domain),w=window.get(n.tab.windowId);if(d!==undefined&&d!==n.id&&n.tab.domain!=='internal')edges.push({from:d,to:n.id,kind:'domain'});else domain.set(n.tab.domain,n.id);if(w!==undefined&&w!==n.id)edges.push({from:w,to:n.id,kind:'window'});else window.set(n.tab.windowId,n.id);}return edges.slice(0,nodes.length*2);}

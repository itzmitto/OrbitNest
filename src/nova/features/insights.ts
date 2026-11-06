import type {NovaPanel} from '../core/model.ts';
import {windowInsights,domainDistribution,tabBalance} from '../core/insights.ts';
import {el} from '../components/dom.ts';
export const insightsPanel:NovaPanel={id:'insights',title:'Orbit observatory',
 description:'Understand the current distribution of tabs and workspaces without recording browsing history.',
 render(host,context){
  const balance=tabBalance(context.tabs);const stats=el('div','nova-grid');
  for(const [label,value] of Object.entries(balance)){
   const card=el('div','nova-tile');card.append(el('span','nova-eyebrow',label.toUpperCase()),el('strong','',String(value)));stats.append(card);
  }
  const chart=el('div','nova-chart');chart.append(el('h3','','Domain distribution'));
  for(const item of domainDistribution(context.tabs)){
   const row=el('div','nova-chart-row');row.append(el('span','',item.label));
   const track=el('div','nova-chart-track');const bar=el('span','nova-chart-bar');bar.style.width=`${item.percentage}%`;
   track.setAttribute('role','img');track.setAttribute('aria-label',`${item.label}: ${item.count} tabs (${item.percentage}%)`);
   track.append(bar);row.append(track,el('strong','',`${item.count}`));chart.append(row);
  }
  const windows=el('div','nova-grid');for(const summary of windowInsights(context.tabs)){
   const card=el('div','nova-tile');card.append(el('span','nova-eyebrow',`WINDOW ${summary.windowId}`),
    el('strong','',`${summary.total} tabs`),el('small','',`${summary.uniqueDomains} domains · ${summary.pinned} pinned · ${summary.audible} audible`));windows.append(card);
  }
  host.append(stats,chart,windows);
 }};

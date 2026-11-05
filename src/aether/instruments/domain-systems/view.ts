import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentDomainSystems,describeDomainSystemsSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Domain star systems instrument has its own accessible visual display. */
export function renderDomainSystemsView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="domain-systems";
 const chart=createSignalChart("Domain star systems / distribution",segmentDomainSystems(tabs,12),"#61deda","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeDomainSystemsSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

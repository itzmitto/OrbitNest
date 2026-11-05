import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentDomainRelay,describeDomainRelaySpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Cross-window domain relay instrument has its own accessible visual display. */
export function renderDomainRelayView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="domain-relay";
 const chart=createSignalChart("Cross-window domain relay / distribution",segmentDomainRelay(tabs,12),"#a3f2d0","rings");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeDomainRelaySpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

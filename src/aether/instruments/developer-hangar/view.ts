import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentDeveloperHangar,describeDeveloperHangarSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Developer hangar instrument has its own accessible visual display. */
export function renderDeveloperHangarView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="developer-hangar";
 const chart=createSignalChart("Developer hangar / distribution",segmentDeveloperHangar(tabs,12),"#82edbd","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeDeveloperHangarSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

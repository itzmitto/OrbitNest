import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentPinnedConstellations,describePinnedConstellationsSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Pinned constellations instrument has its own accessible visual display. */
export function renderPinnedConstellationsView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="pinned-constellations";
 const chart=createSignalChart("Pinned constellations / distribution",segmentPinnedConstellations(tabs,12),"#c5a4ff","rings");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describePinnedConstellationsSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentDuplicateOrbits,describeDuplicateOrbitsSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Duplicate planet finder instrument has its own accessible visual display. */
export function renderDuplicateOrbitsView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="duplicate-orbits";
 const chart=createSignalChart("Duplicate planet finder / distribution",segmentDuplicateOrbits(tabs,12),"#ffbf83","rings");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeDuplicateOrbitsSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

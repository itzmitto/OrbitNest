import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentPlanetMetadata,describePlanetMetadataSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Planet metadata quality instrument has its own accessible visual display. */
export function renderPlanetMetadataView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="planet-metadata";
 const chart=createSignalChart("Planet metadata quality / distribution",segmentPlanetMetadata(tabs,12),"#e8ce94","donut");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describePlanetMetadataSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

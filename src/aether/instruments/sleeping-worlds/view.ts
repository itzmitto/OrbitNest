import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentSleepingWorlds,describeSleepingWorldsSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Sleeping worlds instrument has its own accessible visual display. */
export function renderSleepingWorldsView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="sleeping-worlds";
 const chart=createSignalChart("Sleeping worlds / distribution",segmentSleepingWorlds(tabs,12),"#9caaf9","rings");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeSleepingWorldsSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

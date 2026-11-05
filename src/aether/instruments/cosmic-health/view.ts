import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentCosmicHealth,describeCosmicHealthSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Cosmic workspace health instrument has its own accessible visual display. */
export function renderCosmicHealthView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="cosmic-health";
 const chart=createSignalChart("Cosmic workspace health / distribution",segmentCosmicHealth(tabs,12),"#8cdeae","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeCosmicHealthSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

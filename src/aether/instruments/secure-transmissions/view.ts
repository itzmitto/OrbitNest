import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentSecureTransmissions,describeSecureTransmissionsSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Protocol sentinel instrument has its own accessible visual display. */
export function renderSecureTransmissionsView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="secure-transmissions";
 const chart=createSignalChart("Protocol sentinel / distribution",segmentSecureTransmissions(tabs,12),"#83e6bf","donut");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeSecureTransmissionsSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

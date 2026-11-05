import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentQuietZone,describeQuietZoneSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Quiet zone planning instrument has its own accessible visual display. */
export function renderQuietZoneView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="quiet-zone";
 const chart=createSignalChart("Quiet zone planning / distribution",segmentQuietZone(tabs,12),"#88dfdf","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeQuietZoneSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

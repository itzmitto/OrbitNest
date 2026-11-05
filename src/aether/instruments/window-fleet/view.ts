import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentWindowFleet,describeWindowFleetSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Window fleet navigator instrument has its own accessible visual display. */
export function renderWindowFleetView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="window-fleet";
 const chart=createSignalChart("Window fleet navigator / distribution",segmentWindowFleet(tabs,12),"#7ed4ff","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeWindowFleetSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

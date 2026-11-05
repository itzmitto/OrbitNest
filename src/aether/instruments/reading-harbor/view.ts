import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentReadingHarbor,describeReadingHarborSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Reading harbor instrument has its own accessible visual display. */
export function renderReadingHarborView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="reading-harbor";
 const chart=createSignalChart("Reading harbor / distribution",segmentReadingHarbor(tabs,12),"#b1dcff","rings");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeReadingHarborSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentTabSearch,describeTabSearchSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Galaxy title explorer instrument has its own accessible visual display. */
export function renderTabSearchView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="tab-search";
 const chart=createSignalChart("Galaxy title explorer / distribution",segmentTabSearch(tabs,12),"#e3b6ff","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeTabSearchSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

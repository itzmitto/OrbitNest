import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentCreativeStudio,describeCreativeStudioSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Creative studio systems instrument has its own accessible visual display. */
export function renderCreativeStudioView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="creative-studio";
 const chart=createSignalChart("Creative studio systems / distribution",segmentCreativeStudio(tabs,12),"#fca9b9","donut");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeCreativeStudioSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

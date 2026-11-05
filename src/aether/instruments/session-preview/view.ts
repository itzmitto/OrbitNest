import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentSessionPreview,describeSessionPreviewSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Session launch preview instrument has its own accessible visual display. */
export function renderSessionPreviewView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="session-preview";
 const chart=createSignalChart("Session launch preview / distribution",segmentSessionPreview(tabs,12),"#7dcaf4","donut");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeSessionPreviewSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

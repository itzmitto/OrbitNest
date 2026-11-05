import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentAudioObservatory,describeAudioObservatorySpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Audio radar instrument has its own accessible visual display. */
export function renderAudioObservatoryView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="audio-observatory";
 const chart=createSignalChart("Audio radar / distribution",segmentAudioObservatory(tabs,12),"#fc98d9","donut");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeAudioObservatorySpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

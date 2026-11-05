import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentRestorePreflight,describeRestorePreflightSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Restore safety preview instrument has its own accessible visual display. */
export function renderRestorePreflightView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="restore-preflight";
 const chart=createSignalChart("Restore safety preview / distribution",segmentRestorePreflight(tabs,12),"#e4b2ff","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeRestorePreflightSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

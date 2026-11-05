import type {BrowserTab} from '../../core/types.ts';
import {createSignalChart} from '../../ui/chart.ts';
import {segmentGalaxyBalance,describeGalaxyBalanceSpread} from './segments.ts';
import '../../styles/charts.css';
import './view.css';
/** The Galaxy balance monitor instrument has its own accessible visual display. */
export function renderGalaxyBalanceView(tabs:BrowserTab[]):HTMLElement{
 const wrapper=document.createElement('div');wrapper.className='aether-instrument-detail';
 wrapper.dataset.instrument="galaxy-balance";
 const chart=createSignalChart("Galaxy balance monitor / distribution",segmentGalaxyBalance(tabs,12),"#f0c18e","bars");
 wrapper.append(chart);
 const note=document.createElement('p');note.className='aether-instrument-annotation';
 note.textContent=describeGalaxyBalanceSpread(tabs);
 wrapper.append(note);
 const privacy=document.createElement('p');privacy.className='aether-instrument-privacy';
 privacy.textContent='This chart is computed in your browser from open-tab metadata only.';
 wrapper.append(privacy);
 return wrapper;
}

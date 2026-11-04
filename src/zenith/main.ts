import './ui/design.css';
import {layout,setContent,toast} from './ui/shell';
import type {Page} from './core/types';
import {getPreferences} from './core/state';
import {mountPlanetarium} from './pages/planetarium';
import {mountAtlas} from './pages/atlas';
import {mountObservatory} from './pages/observatory';
import {mountSessions} from './pages/sessions';
import {mountMissionControl} from './pages/mission-control';
import {mountPreferences} from './pages/preferences';
const metadata:Record<Page,[string,string]>= {
 'planetarium':['Your universe, reimagined.','Explore your browser tabs as luminous, fully rendered WebGL planets. Rotate, discover and organize your universe.'],
 'atlas':['Map your galaxy.','Find star systems, understand domain clusters and discover the planets orbiting each one.'],
 'observatory':['Observe everything.','A live snapshot of tab telemetry, usage patterns and useful space signals.'],
 'sessions':['Save your universe.','Preserve important constellations and restore them when you need them.'],
 'mission-control':['Mission Control.','Practical tools for a clear browser galaxy. You remain in control of all tab actions.'],
 'preferences':['Shape your space.','Adjust your personal atmosphere, motion and accessibility settings.']
};
const name=document.body.dataset.zenithPage as Page;
if(!name||!metadata[name])throw new Error('Zenith page is not defined');
document.documentElement.dataset.theme=getPreferences().theme;
document.querySelector('#app')?.replaceWith(layout(name,...metadata[name]));
const pages:Record<Page,()=>Promise<()=>void>>={'planetarium':mountPlanetarium,'atlas':mountAtlas,
 'observatory':mountObservatory,'sessions':mountSessions,'mission-control':mountMissionControl,'preferences':mountPreferences};
let cleanup:(()=>void)|null=null;
void pages[name]().then(dispose=>{cleanup=dispose;}).catch(error=>{
 console.error('OrbitNest Zenith page error',error);
 setContent('<div class="z-card z-empty">This space station could not initialize. Try reloading the page.</div>');
 toast('Unable to initialize this page');
});
window.addEventListener('pagehide',()=>cleanup?.(),{once:true});

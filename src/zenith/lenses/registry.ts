import {lensBackgroundPlanets} from './background-planets.ts';
import {lensActivePlanets} from './active-planets.ts';
import {lensQuietPlanets} from './quiet-planets.ts';
import {lensAudioPlanets} from './audio-planets.ts';
import {lensUnpinnedWorlds} from './unpinned-worlds.ts';
import {lensPinnedWorlds} from './pinned-worlds.ts';
import type {TabLens} from '../core/types.ts';
export const lenses:TabLens[]=[lensBackgroundPlanets,lensActivePlanets,lensQuietPlanets,lensAudioPlanets,lensUnpinnedWorlds,lensPinnedWorlds,{id:'all',label:'Every planet',description:'View every open browser tab.',select:tabs=>tabs}];
export function getLens(id:string):TabLens{return lenses.find(l=>l.id===id)||lenses[0];}

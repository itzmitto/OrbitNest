import {lensReferenceWorlds} from './reference-worlds.ts';
import {lensCommunicationWorlds} from './communication-worlds.ts';
import {lensMediaWorlds} from './media-worlds.ts';
import {lensCreativeWorlds} from './creative-worlds.ts';
import {lensDevWorlds} from './dev-worlds.ts';
import {lensInternalPlanets} from './internal-planets.ts';
import {lensInsecurePlanets} from './insecure-planets.ts';
import {lensSecurePlanets} from './secure-planets.ts';
import {lensSleepingPlanets} from './sleeping-planets.ts';
import {lensMutedPlanets} from './muted-planets.ts';
import {lensBackgroundPlanets} from './background-planets.ts';
import {lensActivePlanets} from './active-planets.ts';
import {lensQuietPlanets} from './quiet-planets.ts';
import {lensAudioPlanets} from './audio-planets.ts';
import {lensUnpinnedWorlds} from './unpinned-worlds.ts';
import {lensPinnedWorlds} from './pinned-worlds.ts';
import type {TabLens} from '../core/types.ts';
export const lenses:TabLens[]=[lensReferenceWorlds,lensCommunicationWorlds,lensMediaWorlds,lensCreativeWorlds,lensDevWorlds,lensInternalPlanets,lensInsecurePlanets,lensSecurePlanets,lensSleepingPlanets,lensMutedPlanets,lensBackgroundPlanets,lensActivePlanets,lensQuietPlanets,lensAudioPlanets,lensUnpinnedWorlds,lensPinnedWorlds,{id:'all',label:'Every planet',description:'View every open browser tab.',select:tabs=>tabs}];
export function getLens(id:string):TabLens{return lenses.find(l=>l.id===id)||lenses[0];}

import type {AetherFeature} from './core/types.ts';
/** Feature modules register here when a fully tested surface is available. */
import {domain_systemsFeature} from './instruments/domain-systems/feature.ts';
import {duplicate_orbitsFeature} from './instruments/duplicate-orbits/feature.ts';
import {audio_observatoryFeature} from './instruments/audio-observatory/feature.ts';
import {window_fleetFeature} from './instruments/window-fleet/feature.ts';
import {pinned_constellationsFeature} from './instruments/pinned-constellations/feature.ts';
export const features:AetherFeature[]=[pinned_constellationsFeature,window_fleetFeature,audio_observatoryFeature,duplicate_orbitsFeature,domain_systemsFeature,];
export function getFeature(id:string):AetherFeature|undefined{return features.find(feature=>feature.id===id);}
export function categories():string[]{return [...new Set(features.map(feature=>feature.category))];}

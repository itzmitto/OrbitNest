import type {AetherFeature} from './core/types.ts';
/** Feature modules register here when a fully tested surface is available. */
import {domain_systemsFeature} from './instruments/domain-systems/feature.ts';
import {duplicate_orbitsFeature} from './instruments/duplicate-orbits/feature.ts';
import {audio_observatoryFeature} from './instruments/audio-observatory/feature.ts';
import {window_fleetFeature} from './instruments/window-fleet/feature.ts';
import {pinned_constellationsFeature} from './instruments/pinned-constellations/feature.ts';
import {secure_transmissionsFeature} from './instruments/secure-transmissions/feature.ts';
import {tab_searchFeature} from './instruments/tab-search/feature.ts';
import {reading_harborFeature} from './instruments/reading-harbor/feature.ts';
import {developer_hangarFeature} from './instruments/developer-hangar/feature.ts';
import {creative_studioFeature} from './instruments/creative-studio/feature.ts';
import {quiet_zoneFeature} from './instruments/quiet-zone/feature.ts';
export const features:AetherFeature[]=[quiet_zoneFeature,creative_studioFeature,developer_hangarFeature,reading_harborFeature,tab_searchFeature,secure_transmissionsFeature,pinned_constellationsFeature,window_fleetFeature,audio_observatoryFeature,duplicate_orbitsFeature,domain_systemsFeature,];
export function getFeature(id:string):AetherFeature|undefined{return features.find(feature=>feature.id===id);}
export function categories():string[]{return [...new Set(features.map(feature=>feature.category))];}

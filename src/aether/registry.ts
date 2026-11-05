import type {AetherFeature} from './core/types.ts';
/** Feature modules register here when a fully tested surface is available. */
import {domain_systemsFeature} from './instruments/domain-systems/feature.ts';
import {duplicate_orbitsFeature} from './instruments/duplicate-orbits/feature.ts';
export const features:AetherFeature[]=[duplicate_orbitsFeature,domain_systemsFeature,];
export function getFeature(id:string):AetherFeature|undefined{return features.find(feature=>feature.id===id);}
export function categories():string[]{return [...new Set(features.map(feature=>feature.category))];}

import type {AetherFeature} from './core/types.ts';
/** Feature modules register here when a fully tested surface is available. */
export const features:AetherFeature[]=[];
export function getFeature(id:string):AetherFeature|undefined{return features.find(feature=>feature.id===id);}
export function categories():string[]{return [...new Set(features.map(feature=>feature.category))];}

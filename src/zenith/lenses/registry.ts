import {lensPinnedWorlds} from './pinned-worlds.ts';
import type {TabLens} from '../core/types.ts';
export const lenses:TabLens[]=[lensPinnedWorlds,{id:'all',label:'Every planet',description:'View every open browser tab.',select:tabs=>tabs}];
export function getLens(id:string):TabLens{return lenses.find(l=>l.id===id)||lenses[0];}

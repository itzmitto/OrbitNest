import { lensAudible } from './audible.ts';
import { lensPinned } from './pinned.ts';
import type { StudioLens } from '../types';
export const tabLenses:StudioLens[]=[{id:'all',label:'All browser tabs',filter:tabs=>tabs.slice()}];
tabLenses.push(lensPinned);
tabLenses.push(lensAudible);

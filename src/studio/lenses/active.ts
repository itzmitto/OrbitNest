import type { StudioLens } from '../types';
/** Active beacons: a non-destructive lens over the existing open browser tabs. */
export const lensActive:StudioLens={id:'active',label:'Active beacons',filter(tabs){return tabs.filter(t=>t.active);}};

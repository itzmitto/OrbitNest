import type { StudioLens } from '../types';
/** Sleeping satellites: a non-destructive lens over the existing open browser tabs. */
export const lensDiscarded:StudioLens={id:'discarded',label:'Sleeping satellites',filter(tabs){return tabs.filter(t=>t.discarded);}};

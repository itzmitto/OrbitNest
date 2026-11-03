import type { StudioLens } from '../types';
/** Muted stations: a non-destructive lens over the existing open browser tabs. */
export const lensMuted:StudioLens={id:'muted',label:'Muted stations',filter(tabs){return tabs.filter(t=>t.muted);}};

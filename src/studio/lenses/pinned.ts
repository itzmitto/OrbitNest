import type { StudioLens } from '../types';
/** Pinned satellites: a non-destructive lens over the existing open browser tabs. */
export const lensPinned:StudioLens={id:'pinned',label:'Pinned satellites',filter(tabs){return tabs.filter(t=>t.pinned);}};

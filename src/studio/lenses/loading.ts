import type { StudioLens } from '../types';
/** Navigating worlds: a non-destructive lens over the existing open browser tabs. */
export const lensLoading:StudioLens={id:'loading',label:'Navigating worlds',filter(tabs){return tabs.filter(t=>t.loading);}};

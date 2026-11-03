import type { StudioLens } from '../types';
/** Audio transmitters: a non-destructive lens over the existing open browser tabs. */
export const lensAudible:StudioLens={id:'audible',label:'Audio transmitters',filter(tabs){return tabs.filter(t=>t.audible);}};

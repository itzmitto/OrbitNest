import type { StudioLens } from '../types';
/** Background worlds: a non-destructive lens over the existing open browser tabs. */
export const lensBackground:StudioLens={id:'background',label:'Background worlds',filter(tabs){return tabs.filter(t=>!t.active);}};

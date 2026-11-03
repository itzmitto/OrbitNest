import type { StudioLens } from '../types';
/** HTTP connections: a non-destructive lens over the existing open browser tabs. */
export const lensInsecure:StudioLens={id:'insecure',label:'HTTP connections',filter(tabs){return tabs.filter(t=>t.url.startsWith("http://"));}};

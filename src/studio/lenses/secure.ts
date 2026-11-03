import type { StudioLens } from '../types';
/** Secure HTTPS: a non-destructive lens over the existing open browser tabs. */
export const lensSecure:StudioLens={id:'secure',label:'Secure HTTPS',filter(tabs){return tabs.filter(t=>t.url.startsWith("https://"));}};

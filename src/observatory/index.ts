import { observeDocumentDomainCount } from './signals/document-domain-count';
import { observeDeveloperDomainCount } from './signals/developer-domain-count';
import { observeLocalhostTabCount } from './signals/localhost-tab-count';
import { observeShortTitleCount } from './signals/short-title-count';
import { observeLongTitleCount } from './signals/long-title-count';
import { observeUntitledTabCount } from './signals/untitled-tab-count';
import { observeFaviconMissingCount } from './signals/favicon-missing-count';
import { observeFaviconAvailableCount } from './signals/favicon-available-count';
import { observeNonWebPageCount } from './signals/non-web-page-count';
import { observeInsecurePageCount } from './signals/insecure-page-count';
import { observeSecurePageCount } from './signals/secure-page-count';
import { observeUnpinnedWorldCount } from './signals/unpinned-world-count';
import { observePinnedMutedCount } from './signals/pinned-muted-count';
import { observePinnedAudibleCount } from './signals/pinned-audible-count';
import { observeActiveAudibleCount } from './signals/active-audible-count';
import { observeInactiveMutedCount } from './signals/inactive-muted-count';
import { observeUnfocusedWorldCount } from './signals/unfocused-world-count';
import { observeActiveWorldCount } from './signals/active-world-count';
import { observeMutedWorldCount } from './signals/muted-world-count';
import { observeAudibleWorldCount } from './signals/audible-world-count';
import { observePinnedWorldCount } from './signals/pinned-world-count';
import { observeOpenTabCount } from './signals/open-tab-count';
import type { TabRecord } from '../domain/tab';
import type { Observation, Observer } from './types';
const observers: Observer[] = [observeDocumentDomainCount, observeDeveloperDomainCount, observeLocalhostTabCount, observeShortTitleCount, observeLongTitleCount, observeUntitledTabCount, observeFaviconMissingCount, observeFaviconAvailableCount, observeNonWebPageCount, observeInsecurePageCount, observeSecurePageCount, observeUnpinnedWorldCount, observePinnedMutedCount, observePinnedAudibleCount, observeActiveAudibleCount, observeInactiveMutedCount, observeUnfocusedWorldCount, observeActiveWorldCount, observeMutedWorldCount, observeAudibleWorldCount, observePinnedWorldCount, observeOpenTabCount, ];
/** Calculations run entirely in the dashboard; no web APIs are called. */
export function collectObservations(tabs: readonly TabRecord[]): Observation[] {
  return observers.map(observe => observe(tabs));
}

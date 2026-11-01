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
const observers: Observer[] = [observeSecurePageCount, observeUnpinnedWorldCount, observePinnedMutedCount, observePinnedAudibleCount, observeActiveAudibleCount, observeInactiveMutedCount, observeUnfocusedWorldCount, observeActiveWorldCount, observeMutedWorldCount, observeAudibleWorldCount, observePinnedWorldCount, observeOpenTabCount, ];
/** Calculations run entirely in the dashboard; no web APIs are called. */
export function collectObservations(tabs: readonly TabRecord[]): Observation[] {
  return observers.map(observe => observe(tabs));
}

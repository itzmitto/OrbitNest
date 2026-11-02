import { feature as sleeping_planets } from './sleeping-planets';
import { feature as loading_planets } from './loading-planets';
import { feature as cross_window } from './cross-window';
import { feature as query_matches } from './query-matches';
import { feature as secure_pages } from './secure-pages';
import { feature as duplicate_websites } from './duplicate-websites';
import { feature as pinned_orbits } from './pinned-orbits';
import { feature as audio_sources } from './audio-sources';
import { feature as active_worlds } from './active-worlds';
import { feature as window_density } from './window-density';
import { feature as domain_hubs } from './domain-hubs';
import type { MissionFeature } from '../model';
export const missionFeatures: MissionFeature[] = [
  sleeping_planets,
  loading_planets,
  cross_window,
  query_matches,
  secure_pages,
  duplicate_websites,
  pinned_orbits,
  audio_sources,
  active_worlds,
  window_density,
  domain_hubs,
];

import { feature as audio_sources } from './audio-sources';
import { feature as active_worlds } from './active-worlds';
import { feature as window_density } from './window-density';
import { feature as domain_hubs } from './domain-hubs';
import type { MissionFeature } from '../model';
export const missionFeatures: MissionFeature[] = [
  audio_sources,
  active_worlds,
  window_density,
  domain_hubs,
];

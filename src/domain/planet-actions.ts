import type { TabRecord } from './tab';
export function allowedPlanetActions(tab: TabRecord | undefined, demo: boolean) {
  return { canModify: Boolean(tab) && !demo, canMute: Boolean(tab) && !demo && (tab?.audible ?? false), canClose: Boolean(tab) && !demo };
}

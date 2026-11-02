import type { GraphPoint } from './types.ts';
/** The inspector deliberately never exposes a full URL or page body. */
export function inspectGraphPoint(point: GraphPoint | undefined) {
  if (!point) return null;
  return { id: point.id, title: point.tab.title.slice(0, 180), domain: point.tab.domain.slice(0,100),
    windowId: point.windowId, pinned: point.tab.pinned, audible: point.tab.audible, active: point.tab.active };
}

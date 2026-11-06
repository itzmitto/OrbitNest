import type {NovaPanel} from '../core/model.ts';
/** Panels are appended here as each independently tested feature is released. */
import {systemsPanel} from './systems.ts';
export const novaPanels: NovaPanel[] = [systemsPanel];
export function findNovaPanel(id: string): NovaPanel | undefined {
 return novaPanels.find(panel => panel.id === id);
}

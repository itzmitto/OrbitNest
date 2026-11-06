import type {NovaPanel} from '../core/model.ts';
/** Panels are appended here as each independently tested feature is released. */
export const novaPanels: NovaPanel[] = [];
export function findNovaPanel(id: string): NovaPanel | undefined {
 return novaPanels.find(panel => panel.id === id);
}

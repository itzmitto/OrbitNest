import type {NovaPanel} from '../core/model.ts';
/** Panels are appended here as each independently tested feature is released. */
import {systemsPanel} from './systems.ts';
import {sessionsPanel} from './sessions.ts';
import {focusPanel} from './focus.ts';
import {duplicatesPanel} from './duplicates.ts';
import {insightsPanel} from './insights.ts';
import {commandsPanel} from './commands.ts';
import {settingsPanel} from './settings.ts';
export const novaPanels: NovaPanel[] = [systemsPanel,sessionsPanel,focusPanel,duplicatesPanel,insightsPanel,commandsPanel,settingsPanel];
export function findNovaPanel(id: string): NovaPanel | undefined {
 return novaPanels.find(panel => panel.id === id);
}

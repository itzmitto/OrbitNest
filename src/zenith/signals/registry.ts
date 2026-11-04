import {signalSecureShare} from './secure-share.ts';
import {signalDuplicateCount} from './duplicate-count.ts';
import {signalDiscardedCount} from './discarded-count.ts';
import {signalForegroundCount} from './foreground-count.ts';
import {signalMutedCount} from './muted-count.ts';
import {signalAudioCount} from './audio-count.ts';
import {signalPinnedCount} from './pinned-count.ts';
import {signalWindowCount} from './window-count.ts';
import {signalDomainDiversity} from './domain-diversity.ts';
import type {Signal} from '../core/types.ts';
export const signals:Signal[]=[signalSecureShare,signalDuplicateCount,signalDiscardedCount,signalForegroundCount,signalMutedCount,signalAudioCount,signalPinnedCount,signalWindowCount,signalDomainDiversity,];
export function findSignal(id:string):Signal|undefined{return signals.find(s=>s.id===id);}

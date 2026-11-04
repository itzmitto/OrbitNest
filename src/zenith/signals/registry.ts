import {signalDomainDiversity} from './domain-diversity.ts';
import type {Signal} from '../core/types.ts';
export const signals:Signal[]=[signalDomainDiversity,];
export function findSignal(id:string):Signal|undefined{return signals.find(s=>s.id===id);}

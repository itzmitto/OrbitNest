import type {Signal} from '../core/types.ts';
export const signals:Signal[]=[];
export function findSignal(id:string):Signal|undefined{return signals.find(s=>s.id===id);}

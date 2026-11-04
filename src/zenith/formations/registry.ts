import type {OrbitPreset} from '../core/types';
import {defaultFormation} from '../core/scene';
export const formations:OrbitPreset[]=[defaultFormation];
export function getFormation(id:string):OrbitPreset{return formations.find(p=>p.id===id)||defaultFormation;}

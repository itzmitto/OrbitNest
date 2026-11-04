import {orbitDoubleSpiral} from './double-spiral.ts';
import {orbitGoldenRatio} from './golden-ratio.ts';
import {orbitLogarithmicSpiral} from './logarithmic-spiral.ts';
import type {OrbitPreset} from '../core/types.ts';
import {defaultFormation} from '../core/scene.ts';
export const formations:OrbitPreset[]=[defaultFormation,orbitDoubleSpiral,orbitGoldenRatio,orbitLogarithmicSpiral];
export function getFormation(id:string):OrbitPreset{return formations.find(p=>p.id===id)||defaultFormation;}

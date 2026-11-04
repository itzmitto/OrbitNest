import {orbitLemniscate} from './lemniscate.ts';
import {orbitSaturnBelt} from './saturn-belt.ts';
import {orbitOrbitalTorus} from './orbital-torus.ts';
import {orbitHelixTower} from './helix-tower.ts';
import {orbitDoubleSpiral} from './double-spiral.ts';
import {orbitGoldenRatio} from './golden-ratio.ts';
import {orbitLogarithmicSpiral} from './logarithmic-spiral.ts';
import type {OrbitPreset} from '../core/types.ts';
import {defaultFormation} from '../core/scene.ts';
export const formations:OrbitPreset[]=[defaultFormation,orbitLemniscate,orbitSaturnBelt,orbitOrbitalTorus,orbitHelixTower,orbitDoubleSpiral,orbitGoldenRatio,orbitLogarithmicSpiral];
export function getFormation(id:string):OrbitPreset{return formations.find(p=>p.id===id)||defaultFormation;}

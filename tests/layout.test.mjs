import test from 'node:test';import assert from 'node:assert/strict';
import { layoutPlanets } from '../src/graph/layout.ts';import { sampleTabs } from '../src/domain/sample.ts';
test('planet placement is deterministic and bounded',()=>{const a=layoutPlanets(sampleTabs,900,500);assert.deepEqual(a,layoutPlanets(sampleTabs,900,500));assert.equal(new Set(a.map(p=>p.id)).size,5);assert.ok(a.every(p=>p.x>=0&&p.y>=0&&p.x<=900&&p.y<=500));});

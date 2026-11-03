import test from 'node:test';import assert from 'node:assert/strict';
import { paletteAmberDrift } from '../src/studio/palettes/amber-drift.ts';
test('Amber Drift has complete valid colors and bounded star count',()=>{const p=paletteAmberDrift;assert.equal(p.id,'amber-drift');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

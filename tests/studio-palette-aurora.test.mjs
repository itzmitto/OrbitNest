import test from 'node:test';import assert from 'node:assert/strict';
import { paletteAurora } from '../src/studio/palettes/aurora.ts';
test('Aurora Borealis has complete valid colors and bounded star count',()=>{const p=paletteAurora;assert.equal(p.id,'aurora');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

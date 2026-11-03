import test from 'node:test';import assert from 'node:assert/strict';
import { paletteVerdantOrbit } from '../src/studio/palettes/verdant-orbit.ts';
test('Verdant Orbit has complete valid colors and bounded star count',()=>{const p=paletteVerdantOrbit;assert.equal(p.id,'verdant-orbit');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

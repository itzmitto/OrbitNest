import test from 'node:test';import assert from 'node:assert/strict';
import { paletteSupernova } from '../src/studio/palettes/supernova.ts';
test('Supernova has complete valid colors and bounded star count',()=>{const p=paletteSupernova;assert.equal(p.id,'supernova');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

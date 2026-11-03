import test from 'node:test';import assert from 'node:assert/strict';
import { paletteIceGiants } from '../src/studio/palettes/ice-giants.ts';
test('Ice Giants has complete valid colors and bounded star count',()=>{const p=paletteIceGiants;assert.equal(p.id,'ice-giants');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

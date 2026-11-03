import test from 'node:test';import assert from 'node:assert/strict';
import { paletteCopperSky } from '../src/studio/palettes/copper-sky.ts';
test('Copper Sky has complete valid colors and bounded star count',()=>{const p=paletteCopperSky;assert.equal(p.id,'copper-sky');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

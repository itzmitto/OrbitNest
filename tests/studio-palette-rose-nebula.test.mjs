import test from 'node:test';import assert from 'node:assert/strict';
import { paletteRoseNebula } from '../src/studio/palettes/rose-nebula.ts';
test('Rose Nebula has complete valid colors and bounded star count',()=>{const p=paletteRoseNebula;assert.equal(p.id,'rose-nebula');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

import test from 'node:test';import assert from 'node:assert/strict';
import { paletteUltraviolet } from '../src/studio/palettes/ultraviolet.ts';
test('Ultraviolet has complete valid colors and bounded star count',()=>{const p=paletteUltraviolet;assert.equal(p.id,'ultraviolet');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

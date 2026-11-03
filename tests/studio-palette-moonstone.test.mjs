import test from 'node:test';import assert from 'node:assert/strict';
import { paletteMoonstone } from '../src/studio/palettes/moonstone.ts';
test('Moonstone has complete valid colors and bounded star count',()=>{const p=paletteMoonstone;assert.equal(p.id,'moonstone');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});

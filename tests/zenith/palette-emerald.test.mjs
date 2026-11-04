import test from 'node:test';import assert from 'node:assert/strict';
import {paletteEmerald,paletteEmeraldContrast} from '../../src/zenith/palettes/emerald.ts';
test('Emerald Dream is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteEmerald.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteEmerald.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteEmerald.accent,paletteEmerald.background);
 assert.ok(paletteEmeraldContrast()>=0&&paletteEmeraldContrast()<=1);
});

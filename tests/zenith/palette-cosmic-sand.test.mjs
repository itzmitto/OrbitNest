import test from 'node:test';import assert from 'node:assert/strict';
import {paletteCosmicSand,paletteCosmicSandContrast} from '../../src/zenith/palettes/cosmic-sand.ts';
test('Cosmic Sand is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteCosmicSand.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteCosmicSand.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteCosmicSand.accent,paletteCosmicSand.background);
 assert.ok(paletteCosmicSandContrast()>=0&&paletteCosmicSandContrast()<=1);
});

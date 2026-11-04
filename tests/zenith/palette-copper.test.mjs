import test from 'node:test';import assert from 'node:assert/strict';
import {paletteCopper,paletteCopperContrast} from '../../src/zenith/palettes/copper.ts';
test('Copper Orbit is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteCopper.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteCopper.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteCopper.accent,paletteCopper.background);
 assert.ok(paletteCopperContrast()>=0&&paletteCopperContrast()<=1);
});

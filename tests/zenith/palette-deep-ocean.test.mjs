import test from 'node:test';import assert from 'node:assert/strict';
import {paletteDeepOcean,paletteDeepOceanContrast} from '../../src/zenith/palettes/deep-ocean.ts';
test('Deep Ocean is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteDeepOcean.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteDeepOcean.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteDeepOcean.accent,paletteDeepOcean.background);
 assert.ok(paletteDeepOceanContrast()>=0&&paletteDeepOceanContrast()<=1);
});

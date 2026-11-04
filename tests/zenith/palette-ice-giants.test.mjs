import test from 'node:test';import assert from 'node:assert/strict';
import {paletteIceGiants,paletteIceGiantsContrast} from '../../src/zenith/palettes/ice-giants.ts';
test('Ice Giants is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteIceGiants.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteIceGiants.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteIceGiants.accent,paletteIceGiants.background);
 assert.ok(paletteIceGiantsContrast()>=0&&paletteIceGiantsContrast()<=1);
});

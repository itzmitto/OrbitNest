import test from 'node:test';import assert from 'node:assert/strict';
import {paletteStarlight,paletteStarlightContrast} from '../../src/zenith/palettes/starlight.ts';
test('Starlight is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteStarlight.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteStarlight.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteStarlight.accent,paletteStarlight.background);
 assert.ok(paletteStarlightContrast()>=0&&paletteStarlightContrast()<=1);
});

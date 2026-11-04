import test from 'node:test';import assert from 'node:assert/strict';
import {paletteInterstellar,paletteInterstellarContrast} from '../../src/zenith/palettes/interstellar.ts';
test('Interstellar is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteInterstellar.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteInterstellar.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteInterstellar.accent,paletteInterstellar.background);
 assert.ok(paletteInterstellarContrast()>=0&&paletteInterstellarContrast()<=1);
});

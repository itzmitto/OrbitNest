import test from 'node:test';import assert from 'node:assert/strict';
import {paletteSupernova,paletteSupernovaContrast} from '../../src/zenith/palettes/supernova.ts';
test('Supernova is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteSupernova.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteSupernova.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteSupernova.accent,paletteSupernova.background);
 assert.ok(paletteSupernovaContrast()>=0&&paletteSupernovaContrast()<=1);
});

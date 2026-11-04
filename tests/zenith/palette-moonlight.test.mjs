import test from 'node:test';import assert from 'node:assert/strict';
import {paletteMoonlight,paletteMoonlightContrast} from '../../src/zenith/palettes/moonlight.ts';
test('Moonlight is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteMoonlight.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteMoonlight.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteMoonlight.accent,paletteMoonlight.background);
 assert.ok(paletteMoonlightContrast()>=0&&paletteMoonlightContrast()<=1);
});

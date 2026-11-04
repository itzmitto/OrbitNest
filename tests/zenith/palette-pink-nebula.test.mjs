import test from 'node:test';import assert from 'node:assert/strict';
import {palettePinkNebula,palettePinkNebulaContrast} from '../../src/zenith/palettes/pink-nebula.ts';
test('Pink Nebula is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(palettePinkNebula.background,/^#[a-f0-9]{6}$/);
 assert.match(palettePinkNebula.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(palettePinkNebula.accent,palettePinkNebula.background);
 assert.ok(palettePinkNebulaContrast()>=0&&palettePinkNebulaContrast()<=1);
});

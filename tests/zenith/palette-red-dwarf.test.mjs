import test from 'node:test';import assert from 'node:assert/strict';
import {paletteRedDwarf,paletteRedDwarfContrast} from '../../src/zenith/palettes/red-dwarf.ts';
test('Red Dwarf is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteRedDwarf.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteRedDwarf.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteRedDwarf.accent,paletteRedDwarf.background);
 assert.ok(paletteRedDwarfContrast()>=0&&paletteRedDwarfContrast()<=1);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {paletteHorizon,paletteHorizonContrast} from '../../src/zenith/palettes/horizon.ts';
test('Event Horizon is a real selectable RGB atmosphere with distinct colors',()=>{
 assert.match(paletteHorizon.background,/^#[a-f0-9]{6}$/);
 assert.match(paletteHorizon.accent,/^#[a-f0-9]{6}$/);
 assert.notEqual(paletteHorizon.accent,paletteHorizon.background);
 assert.ok(paletteHorizonContrast()>=0&&paletteHorizonContrast()<=1);
});

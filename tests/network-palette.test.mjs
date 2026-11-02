import test from 'node:test';import assert from 'node:assert/strict';
import {graphColor, parseGraphTheme, GROUP_COLORS} from '../src/network/palette.ts';
test('colors are reproducible, known and scoped to a palette',()=>{assert.equal(graphColor(11),graphColor(11));assert.ok(GROUP_COLORS.includes(graphColor(3)));assert.equal(parseGraphTheme('broken'),'obsidian');});

import test from 'node:test';import assert from 'node:assert/strict';
import {themeOptions} from '../../src/zenith/ui/theme.ts';
test('all color themes include visible materials',()=>{for(const theme of Object.values(themeOptions)){
 assert.match(theme.light,/^#[a-f0-9]{6}$/);assert.match(theme.ring,/^#[a-f0-9]{6}$/);}});

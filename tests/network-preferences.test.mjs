import test from 'node:test';import assert from 'node:assert/strict';
import {parseGraphPreferences} from '../src/network/preferences.ts';
test('unsafe preference strings fallback to supported values',()=>{assert.deepEqual(parseGraphPreferences({theme:'unsafe',group:'unsafe'}),{theme:'obsidian',group:'domain',showLinks:true,animated:true});});

import test from 'node:test';import assert from 'node:assert/strict';
import {validatePreferences,defaultPreferences} from '../../src/aether/core/preferences.ts';
test('uses safe defaults for invalid theme and motion',()=>{
 assert.deepEqual(validatePreferences({theme:'<script>',motion:'yes'}),defaultPreferences);
 assert.equal(validatePreferences({theme:'cosmic',stars:false}).stars,false);
});

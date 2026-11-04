import test from 'node:test';import assert from 'node:assert/strict';
import {formatHost} from '../../src/zenith/core/math.ts';
test('mission control recognizes non-web and web tabs separately',()=>{
 assert.equal(formatHost('chrome://extensions'),'Local page');
 assert.equal(formatHost('https://www.example.org/some/page'),'example.org');
});

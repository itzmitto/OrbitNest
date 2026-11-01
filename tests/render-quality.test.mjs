import test from 'node:test';import assert from 'node:assert/strict';
import {parseRenderQuality,frameInterval,showDetailedRings} from '../src/domain/render-quality.ts';
test('render modes protect battery and heavy galaxies',()=>{
 assert.equal(parseRenderQuality('weird'),'auto');
 assert.equal(frameInterval(300,'battery'),45);
 assert.ok(frameInterval(90,'auto')>frameInterval(5,'auto'));
 assert.equal(showDetailedRings(110,'auto'),false);
 assert.equal(showDetailedRings(110,'cinematic'),true);
});

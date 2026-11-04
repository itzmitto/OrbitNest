import test from 'node:test';import assert from 'node:assert/strict';
import {lensAudioPlanets} from '../../src/zenith/lenses/audio-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Sound planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensAudioPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensAudioPlanets.select([]),[]);
 assert.equal(lensAudioPlanets.select(source).length,result.length);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {segmentPinnedConstellations,describePinnedConstellationsSpread} from '../../../../src/aether/instruments/pinned-constellations/segments.ts';
test('chart segments are ranked and numerically bounded',()=>{
 const points=segmentPinnedConstellations(sampleTabs);assert.ok(points.every(p=>p.value>=0&&p.share>=0&&p.share<=100));
 assert.ok(points.every((p,i)=>p.rank===i+1));
 assert.ok(points.every((p,i)=>i===0||points[i-1].value>=p.value));
 assert.ok(typeof describePinnedConstellationsSpread(sampleTabs)==='string');
});
test('limit and empty selection never create NaN segments',()=>{
 assert.deepEqual(segmentPinnedConstellations([],0),[]);
 assert.ok(segmentPinnedConstellations(sampleTabs,2).length<=2);
});

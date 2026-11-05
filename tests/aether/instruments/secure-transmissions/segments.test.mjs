import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {segmentSecureTransmissions,describeSecureTransmissionsSpread} from '../../../../src/aether/instruments/secure-transmissions/segments.ts';
test('chart segments are ranked and numerically bounded',()=>{
 const points=segmentSecureTransmissions(sampleTabs);assert.ok(points.every(p=>p.value>=0&&p.share>=0&&p.share<=100));
 assert.ok(points.every((p,i)=>p.rank===i+1));
 assert.ok(points.every((p,i)=>i===0||points[i-1].value>=p.value));
 assert.ok(typeof describeSecureTransmissionsSpread(sampleTabs)==='string');
});
test('limit and empty selection never create NaN segments',()=>{
 assert.deepEqual(segmentSecureTransmissions([],0),[]);
 assert.ok(segmentSecureTransmissions(sampleTabs,2).length<=2);
});

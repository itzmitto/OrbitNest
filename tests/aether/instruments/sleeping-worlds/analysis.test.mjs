import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeSleepingWorlds,evaluateSleepingWorlds} from '../../../../src/aether/instruments/sleeping-worlds/analysis.ts';
test("Sleeping worlds reports real tab properties without reading page content",()=>{
 const report=analyzeSleepingWorlds(sampleTabs),buckets=evaluateSleepingWorlds(sampleTabs);
 assert.equal(report.title,"Sleeping worlds");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='example.com'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeSleepingWorlds([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeDeveloperHangar,evaluateDeveloperHangar} from '../../../../src/aether/instruments/developer-hangar/analysis.ts';
test("Developer hangar reports real tab properties without reading page content",()=>{
 const report=analyzeDeveloperHangar(sampleTabs),buckets=evaluateDeveloperHangar(sampleTabs);
 assert.equal(report.title,"Developer hangar");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Git hosting'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeDeveloperHangar([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

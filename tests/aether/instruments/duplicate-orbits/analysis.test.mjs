import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeDuplicateOrbits,evaluateDuplicateOrbits} from '../../../../src/aether/instruments/duplicate-orbits/analysis.ts';
test("Duplicate planet finder reports real tab properties without reading page content",()=>{
 const report=analyzeDuplicateOrbits(sampleTabs),buckets=evaluateDuplicateOrbits(sampleTabs);
 assert.equal(report.title,"Duplicate planet finder");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title.includes('example.com')));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeDuplicateOrbits([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeReadingHarbor,evaluateReadingHarbor} from '../../../../src/aether/instruments/reading-harbor/analysis.ts';
test("Reading harbor reports real tab properties without reading page content",()=>{
 const report=analyzeReadingHarbor(sampleTabs),buckets=evaluateReadingHarbor(sampleTabs);
 assert.equal(report.title,"Reading harbor");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Documentation'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeReadingHarbor([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

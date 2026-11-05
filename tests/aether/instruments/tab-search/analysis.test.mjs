import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeTabSearch,evaluateTabSearch} from '../../../../src/aether/instruments/tab-search/analysis.ts';
test("Galaxy title explorer reports real tab properties without reading page content",()=>{
 const report=analyzeTabSearch(sampleTabs),buckets=evaluateTabSearch(sampleTabs);
 assert.equal(report.title,"Galaxy title explorer");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.length>=1);
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeTabSearch([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeGalaxyBalance,evaluateGalaxyBalance} from '../../../../src/aether/instruments/galaxy-balance/analysis.ts';
test("Galaxy balance monitor reports real tab properties without reading page content",()=>{
 const report=analyzeGalaxyBalance(sampleTabs),buckets=evaluateGalaxyBalance(sampleTabs);
 assert.equal(report.title,"Galaxy balance monitor");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='github.com'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeGalaxyBalance([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

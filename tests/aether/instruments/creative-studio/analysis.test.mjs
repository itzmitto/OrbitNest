import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeCreativeStudio,evaluateCreativeStudio} from '../../../../src/aether/instruments/creative-studio/analysis.ts';
test("Creative studio systems reports real tab properties without reading page content",()=>{
 const report=analyzeCreativeStudio(sampleTabs),buckets=evaluateCreativeStudio(sampleTabs);
 assert.equal(report.title,"Creative studio systems");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Design tools'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeCreativeStudio([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

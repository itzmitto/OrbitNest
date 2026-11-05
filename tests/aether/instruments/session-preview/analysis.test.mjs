import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeSessionPreview,evaluateSessionPreview} from '../../../../src/aether/instruments/session-preview/analysis.ts';
test("Session launch preview reports real tab properties without reading page content",()=>{
 const report=analyzeSessionPreview(sampleTabs),buckets=evaluateSessionPreview(sampleTabs);
 assert.equal(report.title,"Session launch preview");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title.includes('Window 1')));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeSessionPreview([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

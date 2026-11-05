import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeRestorePreflight,evaluateRestorePreflight} from '../../../../src/aether/instruments/restore-preflight/analysis.ts';
test("Restore safety preview reports real tab properties without reading page content",()=>{
 const report=analyzeRestorePreflight(sampleTabs),buckets=evaluateRestorePreflight(sampleTabs);
 assert.equal(report.title,"Restore safety preview");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Safe web links'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeRestorePreflight([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

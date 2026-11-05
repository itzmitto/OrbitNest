import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeWindowFleet,evaluateWindowFleet} from '../../../../src/aether/instruments/window-fleet/analysis.ts';
test("Window fleet navigator reports real tab properties without reading page content",()=>{
 const report=analyzeWindowFleet(sampleTabs),buckets=evaluateWindowFleet(sampleTabs);
 assert.equal(report.title,"Window fleet navigator");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title.includes('Window 1')));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeWindowFleet([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

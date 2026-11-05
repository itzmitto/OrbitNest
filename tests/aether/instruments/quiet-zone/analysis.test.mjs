import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeQuietZone,evaluateQuietZone} from '../../../../src/aether/instruments/quiet-zone/analysis.ts';
test("Quiet zone planning reports real tab properties without reading page content",()=>{
 const report=analyzeQuietZone(sampleTabs),buckets=evaluateQuietZone(sampleTabs);
 assert.equal(report.title,"Quiet zone planning");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Active focus'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeQuietZone([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

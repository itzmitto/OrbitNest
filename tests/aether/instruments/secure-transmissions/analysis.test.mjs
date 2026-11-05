import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeSecureTransmissions,evaluateSecureTransmissions} from '../../../../src/aether/instruments/secure-transmissions/analysis.ts';
test("Protocol sentinel reports real tab properties without reading page content",()=>{
 const report=analyzeSecureTransmissions(sampleTabs),buckets=evaluateSecureTransmissions(sampleTabs);
 assert.equal(report.title,"Protocol sentinel");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='HTTPS pages'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeSecureTransmissions([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

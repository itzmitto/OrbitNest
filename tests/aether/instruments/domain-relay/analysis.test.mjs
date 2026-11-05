import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeDomainRelay,evaluateDomainRelay} from '../../../../src/aether/instruments/domain-relay/analysis.ts';
test("Cross-window domain relay reports real tab properties without reading page content",()=>{
 const report=analyzeDomainRelay(sampleTabs),buckets=evaluateDomainRelay(sampleTabs);
 assert.equal(report.title,"Cross-window domain relay");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='github.com'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeDomainRelay([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

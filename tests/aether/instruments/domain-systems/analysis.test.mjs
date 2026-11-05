import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeDomainSystems,evaluateDomainSystems} from '../../../../src/aether/instruments/domain-systems/analysis.ts';
test("Domain star systems reports real tab properties without reading page content",()=>{
 const report=analyzeDomainSystems(sampleTabs),buckets=evaluateDomainSystems(sampleTabs);
 assert.equal(report.title,"Domain star systems");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='github.com'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeDomainSystems([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

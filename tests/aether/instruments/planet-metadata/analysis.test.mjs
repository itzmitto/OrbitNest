import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzePlanetMetadata,evaluatePlanetMetadata} from '../../../../src/aether/instruments/planet-metadata/analysis.ts';
test("Planet metadata quality reports real tab properties without reading page content",()=>{
 const report=analyzePlanetMetadata(sampleTabs),buckets=evaluatePlanetMetadata(sampleTabs);
 assert.equal(report.title,"Planet metadata quality");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Clearly named tabs'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzePlanetMetadata([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

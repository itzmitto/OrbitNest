import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeCosmicHealth,evaluateCosmicHealth} from '../../../../src/aether/instruments/cosmic-health/analysis.ts';
test("Cosmic workspace health reports real tab properties without reading page content",()=>{
 const report=analyzeCosmicHealth(sampleTabs),buckets=evaluateCosmicHealth(sampleTabs);
 assert.equal(report.title,"Cosmic workspace health");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Duplicate links'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeCosmicHealth([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

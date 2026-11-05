import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {analyzeAudioObservatory,evaluateAudioObservatory} from '../../../../src/aether/instruments/audio-observatory/analysis.ts';
test("Audio radar reports real tab properties without reading page content",()=>{
 const report=analyzeAudioObservatory(sampleTabs),buckets=evaluateAudioObservatory(sampleTabs);
 assert.equal(report.title,"Audio radar");
 assert.equal(report.rows.length,buckets.length);
 assert.ok(report.metrics.every(item=>Number.isFinite(Number(item.value))));
 assert.ok(report.rows.some(row=>row.title==='Playing audio'));
});
test('empty workspace is safe and consistent',()=>{
 const report=analyzeAudioObservatory([]);assert.ok(report.metrics.length>=2);
 assert.ok(Array.isArray(report.rows));assert.ok(report.emptyMessage);
});

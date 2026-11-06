import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const chart=readFileSync(new URL('../../src/nova/features/insights.ts',import.meta.url),'utf8');
test('observatory charts expose spoken percentages and run from current tabs',()=>{
 assert.match(chart,/aria-label/);assert.match(chart,/context\.tabs/);assert.match(chart,/windowInsights/);
});

import test from 'node:test';import assert from 'node:assert/strict';
import {formatCount,formatPercent} from '../src/observatory/types.ts';
test('observatory formats safe quantities',()=>{assert.equal(formatCount(-3),'0'); assert.equal(formatPercent(105),'100%'); assert.equal(formatPercent(NaN),'0%');});

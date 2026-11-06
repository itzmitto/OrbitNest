import test from 'node:test';import assert from 'node:assert/strict';import {novaPanels} from '../../src/nova/features/registry.ts';
test('focus planner is available as a real Nova panel',()=>assert.ok(novaPanels.find(panel=>panel.id==='focus')));

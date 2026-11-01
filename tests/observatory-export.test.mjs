import test from 'node:test';import assert from 'node:assert/strict';
import {exportMissionReport} from '../src/observatory/export.ts';
test('exports only aggregate metadata',()=>{const text=exportMissionReport([{id:'a',label:'Tabs',category:'Activity',value:'2',detail:''}]);assert.match(text,/Tabs: 2/);assert.doesNotMatch(text,/https?:\/\//);});

import test from 'node:test';import assert from 'node:assert/strict';
import { groupTabs } from '../src/domain/group.ts';import { sampleTabs } from '../src/domain/sample.ts';
test('window grouping preserves all tabs',()=>{const groups=groupTabs(sampleTabs,'window');assert.equal(groups.length,2);assert.equal(groups.reduce((sum,g)=>sum+g.tabs.length,0),5);});
test('domain grouping keeps duplicate domain tabs independent',()=>{const groups=groupTabs(sampleTabs,'domain');const github=groups.find(g=>g.key==='github.com');assert.equal(github.tabs.length,2);assert.notEqual(github.tabs[0].id,github.tabs[1].id);});

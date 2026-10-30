import test from 'node:test';import assert from 'node:assert/strict';
import {createSession,parseSession} from '../src/domain/session.ts';import {sampleTabs} from '../src/domain/sample.ts';
test('session stores only public web URLs and validates records',()=>{const snapshot=createSession('test',sampleTabs);assert.equal(snapshot.urls.length,5);assert.equal(parseSession(snapshot)?.name,'test');assert.equal(parseSession({...snapshot,urls:['javascript:alert(1)']}),null);});

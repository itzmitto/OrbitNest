import test from 'node:test';import assert from 'node:assert/strict';
import {captureSession,validateSession} from '../../src/zenith/core/sessions.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('saved constellations exclude browser-internal URLs',()=>{
 const session=captureSession([...demoTabs,{...demoTabs[0],url:'chrome://settings'}],'Test Galaxy');
 assert.ok(validateSession(session));assert.equal(session.tabs.length,demoTabs.length);
 assert.ok(session.tabs.every(t=>t.url.startsWith('https://')));
});

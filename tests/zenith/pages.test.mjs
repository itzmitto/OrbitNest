import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('every Zenith route has a dedicated HTML entry',()=>{
 for(const route of ['planetarium','atlas','observatory','sessions','mission-control','preferences']){
  const html=fs.readFileSync(`${route}.html`,'utf8');assert.ok(html.includes(`data-zenith-page="${route}"`));
  assert.match(html,/src\/zenith\/main.ts/);
 }
});

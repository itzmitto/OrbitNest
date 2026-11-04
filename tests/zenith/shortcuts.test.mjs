import test from 'node:test';import assert from 'node:assert/strict';
import {shortcutHelp} from '../../src/zenith/ui/shortcuts.ts';
test('keyboard documentation reflects registered shortcuts',()=>{
 const html=shortcutHelp([{key:'f',label:'F',description:'Fit the entire scene',run:()=>{}}]);
 assert.match(html,/Fit the entire scene/);assert.match(html,/<kbd>F<\/kbd>/);
});

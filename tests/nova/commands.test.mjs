import test from 'node:test';import assert from 'node:assert/strict';
import {findCommands,commandScore,COMMANDS} from '../../src/nova/core/commands.ts';
test('command search ranks exact matches and semantic keywords above descriptions',()=>{
 assert.equal(findCommands('duplicate')[0].id,'duplicates');
 assert.equal(findCommands('camera')[0].id,'universe');
 assert.ok(commandScore(COMMANDS[0],'Return to 3D universe')>commandScore(COMMANDS[0],'planet'));
});
test('unrecognized commands return no ghost actions',()=>assert.deepEqual(findCommands('zzzzzzzz'),[]));

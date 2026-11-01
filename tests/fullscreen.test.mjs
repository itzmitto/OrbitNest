import test from 'node:test'; import assert from 'node:assert/strict';
import { toggleGalaxyFullscreen } from '../src/graph/fullscreen.ts';
test('fullscreen requires an explicit supported browser action',async()=>{
 const documentRef={fullscreenElement:null};
 assert.equal(await toggleGalaxyFullscreen({}, documentRef),false);
 let requested=0;
 assert.equal(await toggleGalaxyFullscreen({requestFullscreen:async()=>{requested++;}},documentRef),true);
 assert.equal(requested,1);
 assert.equal(await toggleGalaxyFullscreen({requestFullscreen:async()=>{throw Error('denied');}},documentRef),false);
});

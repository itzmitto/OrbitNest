import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import vm from 'node:vm';

const dist = resolve(import.meta.dirname, '../dist');
const read = (path) => readFile(join(dist, path));
const manifest = JSON.parse((await read('manifest.json')).toString('utf8'));

assert.equal(manifest.manifest_version, 3, 'Expected MV3');
assert.equal(manifest.version, '0.2.0', 'Unexpected extension version');
assert.equal(manifest.background.service_worker, 'background.js');
assert.equal(manifest.background.type, 'module');
assert.ok(manifest.action.default_title, 'Toolbar action has no title');
assert.ok(!('default_popup' in manifest.action), 'Popup prevents onClicked from firing');
assert.deepEqual(manifest.permissions, ['tabs'], 'Expected only tabs metadata permission');
assert.ok(!('host_permissions' in manifest), 'Unexpected host permission');
assert.ok(!('content_scripts' in manifest), 'Unexpected page content scripts');

const allIcons = new Set(Object.values(manifest.icons));
for (const iconPath of allIcons) {
  assert.match(iconPath, /^icons\/icon-(16|32|48|128)\.png$/);
  const size = Number(iconPath.match(/icon-(\d+)/)[1]);
  const bytes = await read(iconPath);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `Invalid PNG: ${iconPath}`);
  assert.equal(bytes.readUInt32BE(16), size, `Invalid icon width: ${iconPath}`);
  assert.equal(bytes.readUInt32BE(20), size, `Invalid icon height: ${iconPath}`);
}
for (const iconPath of Object.values(manifest.action.default_icon)) {
  assert.ok(allIcons.has(iconPath), `Action icon missing from manifest icons: ${iconPath}`);
}

const html = (await read('index.html')).toString('utf8');
assert.match(html, /<div id="root"><\/div>/, 'React mount element missing');
assert.match(html, /<script\s+type="module"\s+crossorigin\s+src="\.\/assets\//, 'Expected local bundled JS');
assert.doesNotMatch(html, /https?:\/\//, 'Remote resource found in built HTML');
const assets = await readdir(join(dist, 'assets'));
assert.ok(assets.some((name) => name.endsWith('.js')), 'UI JavaScript missing');
assert.ok(assets.some((name) => name.endsWith('.css')), 'UI CSS missing');
assert.ok((await stat(join(dist, 'background.js'))).size > 0, 'Service worker missing');

const source = (await read('background.js')).toString('utf8');
assert.doesNotMatch(source, /\b(?:import|export)\s+(?!\()/, 'Worker unexpectedly references another module');
let actionHandler;
const created = [];
const chrome = {
  action: { onClicked: { addListener(listener) { actionHandler = listener; } } },
  runtime: { getURL(path) { return `chrome-extension://fake-id/${path}`; } },
  tabs: { create(properties) { created.push(properties); return Promise.resolve({ id: 1 }); } },
};
vm.runInNewContext(source, { chrome, console }, { filename: 'background.js' });
assert.equal(typeof actionHandler, 'function', 'Extension toolbar listener is missing');
actionHandler();
assert.equal(created.length, 1, 'Toolbar action did not open exactly one tab');
assert.equal(created[0].url, 'chrome-extension://fake-id/index.html', 'Incorrect dashboard URL');
assert.equal(created[0].active, true, 'New dashboard tab must be active');

console.log('[OrbitNest] Manifest V3, icons, bundled assets, service worker, launcher and permission boundaries: OK');

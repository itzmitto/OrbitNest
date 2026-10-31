import test from 'node:test';
import assert from 'node:assert/strict';
import { safeExportName } from '../src/domain/toolkit/safe-export-name.ts';

test('feat: generate safe local session export filenames', () => {
  assert.equal(safeExportName('Team / Workspace'), 'Team---Workspace.json');
  assert.equal(safeExportName(''), 'orbitnest-session.json');
  assert.ok(!safeExportName('../notes').includes('/'));
});

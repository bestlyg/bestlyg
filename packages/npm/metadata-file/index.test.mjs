import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDirname, getFilename } from './index.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

assert.equal(getFilename(import.meta.url), filename);
assert.equal(getFilename(import.meta), filename);
assert.equal(getFilename(new URL(import.meta.url)), filename);
assert.equal(getDirname(import.meta.url), dirname);

function implicitFilename() {
    return getFilename();
}

function implicitDirname() {
    return getDirname();
}

assert.equal(implicitFilename(), filename);
assert.equal(implicitDirname(), dirname);
assert.throws(() => getFilename(999), /Pass import\.meta\.url.*__filename/);

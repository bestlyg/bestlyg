const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { getDirname, getFilename } = require('./index.cjs');

assert.equal(getFilename(__filename), __filename);
assert.equal(getFilename(pathToFileURL(__filename)), __filename);
assert.equal(getFilename({ url: pathToFileURL(__filename).href }), __filename);
assert.equal(getDirname(__filename), __dirname);

function implicitDirname() {
    return getDirname();
}

assert.equal(implicitDirname(), __dirname);
assert.throws(() => getDirname(999), /Pass import\.meta\.url.*__filename/);

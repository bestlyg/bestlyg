import { test, expect } from '@rstest/core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { requireJson } = require('package-json-extension');
const root = fileURLToPath(new URL('./', import.meta.url));
for (const entry of fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())) {
    test(entry.name, () => {
        const actual = requireJson(path.join(root, entry.name, 'package.base.json'));
        delete actual.extension;
        const expected = JSON.parse(
            fs.readFileSync(path.join(root, entry.name, 'expect.json'), 'utf8'),
        );
        delete expected.extension;
        expect(actual).toStrictEqual(expected);
    });
}

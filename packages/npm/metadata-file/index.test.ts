import { test } from '@rstest/core';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test.each(['esm.mjs', 'commonjs.cjs'])('preserves native module filenames: %s', (fixture) => {
    execFileSync(
        process.execPath,
        [fileURLToPath(new URL('./fixtures/' + fixture, import.meta.url))],
        { stdio: 'pipe' },
    );
});

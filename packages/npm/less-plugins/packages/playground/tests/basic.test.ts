import { test, expect } from '@rstest/core';
import { readFileSync } from 'node:fs';
import { renderFixture } from '../../../render-fixture.mjs';

test('preserves the existing Less CSS through the ESM plugin API', async () => {
    const css = await renderFixture(import.meta.url);
    const expected = readFileSync(new URL('./basic.expected.css', import.meta.url), 'utf8');
    expect(css.trim()).toBe(expected.trim());
});

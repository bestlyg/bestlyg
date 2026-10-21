import { test } from '@rstest/core';
import { runDistSmoke } from '../scripts/test-dist.mjs';

test('production bundle starts and serves real database requests', async () => {
    await runDistSmoke();
}, 60_000);

test('Nest watch mode starts and serves real database requests', async () => {
    await runDistSmoke(true);
}, 60_000);

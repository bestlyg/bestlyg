#!/usr/bin/env node
import '@bestlyg/cli/globals';

await $`pnpm -w format`.stdio('inherit', 'inherit');

await $`pnpm --filter @bestlyg/data encrypt`.stdio('inherit', 'inherit');

await $`pnpm -w format`.stdio('inherit', 'inherit');

await $`git add -A`.stdio('inherit', 'inherit');

await $`git commit -m "feat: 🎸 update data"`.stdio('inherit', 'inherit');

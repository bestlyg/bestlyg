import 'zx/globals';

await $`pnpm nx build @bestlyg/site`;
await import('./zip.mjs');
await $`pnpm script site/send`;

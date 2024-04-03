import 'zx/globals';

await $`pnpm nx build site`;
await $`zip -vr ./packages/site/build/site.zip ./packages/site/build`;
await $`pnpm script site/send`;

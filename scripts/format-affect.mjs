import '@bestlyg/cli/globals';

const diff = await $`git diff-index --name-only HEAD --`;
console.log(diff.stdout);
// await $`pnpm prettier --write ${diff}`;

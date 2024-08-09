import '@bestlyg/cli/globals';

const CWD = best.utils.CWD;
const resolve = best.utils.getResolveFunction(import.meta, 1);

const diffPath = await $`git diff HEAD --name-only`;
const diffRealPath = diffPath.stdout
    .trim()
    .split('\n')
    .map(v => resolve(decodeURIComponent(v)));

console.log(diffRealPath);
await $`pnpm prettier --write ${diffRealPath}`;

import { getDirname, getResolveFunction } from '@bestlyg/server-shared';
import { $ } from 'zx';

const resolve = getResolveFunction(getDirname(import.meta.url), 1);

const diffPath = await $`git diff HEAD --name-only`;
const diffRealPath = diffPath.stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((v) => resolve(decodeURIComponent(v)));

console.log(diffRealPath);
if (diffRealPath.length) {
    await $`pnpm oxfmt ${diffRealPath}`;
}

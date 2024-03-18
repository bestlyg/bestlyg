import 'zx/globals';

await $`git submodule update --init --recursive`;
await $`git submodule add https://github.com/bestlyg/best-style.git submodules/best-style     `;

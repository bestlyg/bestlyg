import 'zx/globals';

await $`git remote add gitee https://github.com/bestlyg/bestlyg.git`;
await $`git remote add github https://github.com/bestlyg/bestlyg.git`;
await $`git config --global user.email "bestlyg@foxmail.com"`
await $`git config --global user.name bestlyg`
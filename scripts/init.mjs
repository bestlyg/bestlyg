import '@bestlyg/cli/globals';
import { ServerConfigurationSchema, getConfiguration } from '@bestlyg/common';
import { execSync } from 'child_process';

const resolve = best.utils.getResolveFunction(import.meta, 1);
best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});
const config = ServerConfigurationSchema.parse(getConfiguration(process.env));
const sqlFileName = `best_data.sql`;
// await $`git remote add gitee https://github.com/bestlyg/bestlyg.git`;
// await $`git remote add github https://github.com/bestlyg/bestlyg.git`;
// await $`git config --global user.email "bestlyg@foxmail.com"`;
// await $`git config --global user.name bestlyg`;
// await $`scp root@106.54.220.193:/root/${sqlFileName} ${resolve('databases', 'bestlyg-data', sqlFileName)}`;
execSync(
    `scp root@106.54.220.193:/root/${sqlFileName} ${resolve('databases', 'bestlyg-data', sqlFileName)}`,
    { stdio: 'inherit' },
);

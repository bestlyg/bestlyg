import _ from 'lodash';
import {
    FILE_NAME_PACKAGE_JSON,
    currentPackageInfo,
    getDirname,
    getResolveFunction,
    Logger,
} from '@bestlyg/server-shared';
import { $, argv, cd, fs, within } from 'zx';

const resolve = getResolveFunction(getDirname(import.meta.url), 1);
const { name } = argv;
const logger = new Logger({ prefix: 'TEMPLATE' });

logger.info(`Name: ${name}`);

const npmWorkspacePath = resolve('..');
const pkgPath = resolve(npmWorkspacePath, name);

const pkgData = _.pick(currentPackageInfo, ['version', 'type', 'author', 'repository', 'license']);

Object.assign(pkgData, { name });

await fs.ensureDir(resolve(pkgPath));
await fs.writeFile(resolve(pkgPath, FILE_NAME_PACKAGE_JSON), JSON.stringify(pkgData, null, 4));

await within(async () => {
    cd(pkgPath);
    await $`pnpm publish --registry https://registry.npmjs.org --access=public --no-git-checks`.stdio(
        'inherit',
        'inherit',
        'inherit',
    );
});

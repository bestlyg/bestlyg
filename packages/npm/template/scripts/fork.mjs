import '@bestlyg/cli/globals';
import _ from 'lodash';

const resolve = best.utils.getResolveFunction(import.meta, 1);
const { name } = argv;
const {
    utils: { print, FILE_NAME_PACKAGE_JSON },
} = best;

print.info(`Name: ${name}`);

const npmWorkspacePath = resolve('..');
const pkgPath = resolve(npmWorkspacePath, name);

const pkgData = _.pick(best.utils.currentPackageInfo, [
    'version',
    'type',
    'author',
    'repository',
    'license',
]);

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

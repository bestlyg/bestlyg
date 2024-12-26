import '@bestlyg/cli/globals';
import { git } from '@bestlyg/config';

const resolve = best.utils.getResolveFunction(import.meta, 1);
const tmpDir = tempdir();
$.stdio = 'inherit';
await $`git clone ${git.GITHUB_REPO_PATH_BESTLYG_GITHUBIO_IO} ${tmpDir}`;
const files = await glob(['./**/*.*'], {
    cwd: tmpDir,
    ignore: ['.git'],
});
await Promise.all(
    files.map(filePath => {
        return fs.remove(resolve(tmpDir, filePath));
    }),
);
await $`pnpm build:github`;
await fs.copySync(resolve('dist'), tmpDir);
await within(async () => {
    cd(tmpDir);
    await $`git add -A`;
    await $`git commit -m "feat: update site at ${best.dayjs().format('YYYY-MM-DD HH:mm:ss')}"`;
    await $`git push`;
});

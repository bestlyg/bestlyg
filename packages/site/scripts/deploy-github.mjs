import '@bestlyg/cli/globals';
import { git } from '@bestlyg/config';

const tmpDir = tempdir();

best.dotenv.config({
    BESTLYG_SITE_BASE_URL: '/',
});

// await $`git clone ${git.GITHUB_REPO_PATH_BESTLYG_GITHUBIO_IO} ${tmpDir}`;
await $`pnpm build`;

import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';
import { debounce } from 'lodash';
import { execSync } from 'child_process';

export function startWatchSiteZip() {
  const siteZipPath = '/home/ubuntu/site.zip';
  const deploySite = debounce(
    () => execSync(`node ../../scripts/site/unzip.mjs`, { cwd: resolve() }),
    1000,
  );

  chokidar.watch(siteZipPath, { persistent: true }).on('all', async (event) => {
    switch (event) {
      case 'add':
      case 'change':
        deploySite();
      default:
        return;
    }
  });
}

export function resolve(...p: string[]) {
  return path.resolve(__dirname, ...new Array(2).fill('..'), ...p);
}

export function getHttpsOptions() {
  try {
    const httpsOptions = {
      key: fs.readFileSync(
        resolve('src', 'secrets', 'bestlyg.com.key'),
        'utf8',
      ),
      cert: fs.readFileSync(
        resolve('src', 'secrets', 'bestlyg.com_bundle.crt'),
        'utf8',
      ),
    };
    return httpsOptions;
  } catch (_) {
    return null;
  }
}

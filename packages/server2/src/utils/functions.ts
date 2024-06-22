import * as path from 'path';
import * as fs from 'fs';

export function resolve(...p: string[]) {
  return path.resolve(__dirname, ...new Array(2).fill('..'), ...p);
}

export function getHttpsOptions() {
  try {
    const httpsOptions = {
      key: fs.readFileSync(resolve('secrets', 'bestlyg.com.key'), 'utf8'),
      cert: fs.readFileSync(
        resolve('secrets', 'bestlyg.com_bundle.crt'),
        'utf8',
      ),
    };
    return httpsOptions;
  } catch (_) {
    return null;
  }
}

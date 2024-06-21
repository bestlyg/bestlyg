import path from 'path';
import fs from 'fs';

export function resolve(...p: string[]) {
  return path.resolve(__dirname, ...new Array(2).fill('..'), ...p);
}

export function getHttpsOptions() {
  try {
    const httpsOptions = {
      key: fs.readFileSync(resolve('secrets', 'private-key.pem')),
      cert: fs.readFileSync(resolve('secrets', 'public-certificate.pem')),
    };
    return httpsOptions;
  } catch (_) {
    return null;
  }
}

import { XIdl } from '@xidl/ecma-client';
import path from 'path';
import url from 'url';

const resolve = (...p: string[]) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const xidl = new XIdl({
    entryPath: resolve('../../proto/index.proto'),
    distPath: resolve('dist'),
});

async function main() {
    await xidl.output();
}

main().catch(err => {
    console.log(err);
});

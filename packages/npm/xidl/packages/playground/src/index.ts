import { XIdl } from '@xidl/ecma-core/dist/esm/index.js';
import path from 'path';
import url from 'url';

const resolve = (...p: string[]) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const xidl = new XIdl({
    inputFilePath: resolve('../../proto/main.proto'),
    outputDirPath: resolve('dist'),
});

async function main() {
    await xidl.output();
}

main().catch(err => {
    console.log(err);
});

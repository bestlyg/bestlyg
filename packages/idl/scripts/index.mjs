import { XIdl as XIdlClient } from '@xidl/typescript-client';
import { XIdl as XIdlServer } from '@xidl/typescript-server';
import path from 'path';
import url from 'url';

const resolve = (...p) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const xidlClient = new XIdlClient({
    entryPath: resolve('proto/index.proto'),
    distPath: resolve('src/client'),
});

xidlClient.hooks.onGenNamespace.tap('bestlyg/xidl', async (code, obj) => {
    console.log('===> obj', obj, code);
    return [
        `/* eslint-disable @typescript-eslint/no-namespace */`,
        `import { fetch } from '@/utils';`,
        code,
    ].join('\n');
});

const xidlServer = new XIdlServer({
    entryPath: resolve('proto/index.proto'),
    distPath: resolve('src/server'),
});

async function main() {
    await xidlClient.output();
    await xidlServer.output();
}

main().catch(err => {
    console.log(err);
});

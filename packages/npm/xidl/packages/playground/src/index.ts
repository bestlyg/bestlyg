import { XIdl as XIdlCore } from '@xidl/typescript-core';
import { XIdl as XIdlClient } from '@xidl/typescript-client';
import { XIdl as XIdlServer } from '@xidl/typescript-server';
import path from 'path';
import url from 'url';

const resolve = (...p: string[]) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const xidlClient = new XIdlClient({
    entryPath: resolve('../../proto/index.proto'),
    distPath: resolve('dist/client'),
});

const xidlServer = new XIdlServer({
    entryPath: resolve('../../proto/index.proto'),
    distPath: resolve('dist/server'),
});

const xIdlCore = new XIdlCore({
    entryPath: resolve('../../proto/index.proto'),
    distPath: resolve('dist/core'),
});

async function main() {
    await xidlClient.output();
    await xidlServer.output();
    await xIdlCore.output();
}

main().catch(err => {
    console.log(err);
});

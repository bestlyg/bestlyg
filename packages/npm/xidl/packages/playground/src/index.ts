import { XIdl as XIdlCore } from '@xidl/typescript-core';
import { XIdl as XIdlClient } from '@xidl/typescript-client';
import { XIdl as XIdlServer } from '@xidl/typescript-server';
import path from 'path';
import url from 'url';

const resolve = (...p: string[]) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const xidlClient = new XIdlClient({
    input: {
        filePath: resolve('../../proto/index.proto'),
    },
    output: {
        dirPath: resolve('dist/client'),
        fileName: 'index.ts',
    },
});

const xidlServer = new XIdlServer({
    input: {
        filePath: resolve('../../proto/index.proto'),
    },
    output: {
        dirPath: resolve('dist/server'),
        fileName: 'index.ts',
    },
});

const xIdlCore = new XIdlCore({
    input: {
        filePath: resolve('../../proto/index.proto'),
    },
    output: {
        dirPath: resolve('dist/core'),
        fileName: 'index.ts',
    },
});

async function main() {
    await xidlClient.output();
    await xidlServer.output();
    await xIdlCore.output();
}

main().catch(err => {
    console.log(err);
});

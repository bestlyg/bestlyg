import { XIdl as XIdlClient } from '@xidl/typescript-client';
import { XIdl as XIdlServer } from '@xidl/typescript-server';
import path from 'path';
import url from 'url';

const prefix = 'bestlyg/xidl';

const resolve = (...p) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const plugin = {
    apply: xidl => {
        xidl.hooks.output.afterGenCode.tapPromise(prefix, async code => {
            return [
                `/* eslint-disable @typescript-eslint/no-namespace */`,
                `/* eslint-disable @typescript-eslint/no-unused-vars */`,
                `/* eslint-disable prettier/prettier */`,
                `import { fetch } from '@/idl/utils/fetch';`,
                code,
            ].join('\n');
        });
    },
};
const getConfig = dirPath => {
    return {
        input: {
            filePath: resolve('proto/index.proto'),
        },
        output: {
            dirPath,
            fileName: 'index.ts',
        },
    };
};
const xidlClient = new XIdlClient(getConfig(resolve(`src`, `idl`, `client`))).use(plugin);

const xidlServer = new XIdlServer(getConfig(resolve(`src`, `idl`, `server`))).use(plugin);

async function main() {
    await xidlClient.output();
    await xidlServer.output();
}

main().catch(err => {
    console.log(err);
});

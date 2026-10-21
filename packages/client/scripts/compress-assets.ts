import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, constants, gzip } from 'node:zlib';
import type { Plugin } from 'vite';

const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);

/** Generate the same .br/.gz assets using Node's compression and filesystem APIs. */
export function compressAssets(): Plugin {
    let outputDirectory: string;
    return {
        name: 'compress-assets',
        apply: 'build',
        enforce: 'post',
        configResolved(config) {
            outputDirectory = path.resolve(config.root, config.build.outDir);
        },
        async closeBundle() {
            const entries = await readdir(outputDirectory, {
                recursive: true,
                withFileTypes: true,
            });
            const files = entries
                .filter((entry) => entry.isFile() && /\.(js|mjs|json|css|html)$/i.test(entry.name))
                .map((entry) => path.join(entry.parentPath, entry.name));
            let index = 0;
            await Promise.all(
                Array.from({ length: 4 }, async () => {
                    while (index < files.length) {
                        const filename = files[index++];
                        const source = await readFile(filename);
                        if (source.length < 1025) continue;
                        const [br, gz] = await Promise.all([
                            compressBrotli(source, {
                                params: {
                                    [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
                                    [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
                                },
                            }),
                            compressGzip(source, { level: constants.Z_BEST_COMPRESSION }),
                        ]);
                        await Promise.all([
                            writeFile(`${filename}.br`, br),
                            writeFile(`${filename}.gz`, gz),
                        ]);
                    }
                }),
            );
        },
    };
}

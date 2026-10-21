import { mkdtemp, readFile, rm, writeFile, mkdir, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { brotliDecompressSync, gunzipSync } from 'node:zlib';
import { expect, it } from '@rstest/core';
import type { ResolvedConfig } from 'vite';
import { compressAssets } from './compress-assets';

it('emits valid gzip and Brotli companions while preserving source assets and exclusions', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'bestlyg-compression-'));
    try {
        await mkdir(path.join(root, 'assets'));
        const source = Buffer.from('中文 and JavaScript data\n'.repeat(100));
        await writeFile(path.join(root, 'assets/app.js'), source);
        await writeFile(path.join(root, 'small.css'), 'body {}');
        await writeFile(path.join(root, 'image.png'), source);
        const plugin = compressAssets();
        if (
            typeof plugin.configResolved !== 'function' ||
            typeof plugin.closeBundle !== 'function'
        ) {
            throw new Error('Compression plugin hooks are missing');
        }
        await plugin.configResolved({ root, build: { outDir: '.' } } as ResolvedConfig);
        await plugin.closeBundle.call({} as never);
        expect(await readFile(path.join(root, 'assets/app.js'))).toEqual(source);
        expect(gunzipSync(await readFile(path.join(root, 'assets/app.js.gz')))).toEqual(source);
        expect(brotliDecompressSync(await readFile(path.join(root, 'assets/app.js.br')))).toEqual(
            source,
        );
        await expect(access(path.join(root, 'small.css.gz'))).rejects.toThrow();
        await expect(access(path.join(root, 'image.png.br'))).rejects.toThrow();
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});

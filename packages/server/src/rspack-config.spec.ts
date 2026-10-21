import { describe, it, expect, afterEach, rs } from '@rstest/core';
import type { Compiler, RspackPluginInstance } from '@rspack/core';
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const rspackConfigPath = path.resolve(__dirname, '../rspack.config.mts');
const { default: createRspackConfig } = createRequire(import.meta.url)(
    rspackConfigPath,
) as typeof import('../rspack.config.mjs');

describe('server rspack config', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    const originalBuildType = process.env.BUILD_TYPE;

    const createOptions = () => ({
        output: { path: '/tmp/bestlyg-server-dist', filename: 'main.js' },
        optimization: { splitChunks: false as const },
        externals: ['existing-external'],
        plugins: [{ name: 'existing-plugin', apply: () => {} }],
    });

    afterEach(() => {
        process.env.NODE_ENV = originalNodeEnv;
        process.env.BUILD_TYPE = originalBuildType;
    });

    it('enables fast rebuild settings for development builds', () => {
        process.env.NODE_ENV = 'development';
        delete process.env.BUILD_TYPE;

        const config = createRspackConfig(createOptions());

        expect(config.mode).toBe('development');
        expect(config.cache).toEqual({
            type: 'persistent',
            buildDependencies: [
                rspackConfigPath,
                path.resolve(__dirname, '../package.json'),
                path.resolve(__dirname, '../tsconfig.json'),
                path.resolve(__dirname, '../tsconfig.build.json'),
            ],
        });
        expect(config.incremental).toBe(true);
        expect(config.devtool).toBe('eval-cheap-module-source-map');
        expect(config.output).toMatchObject({
            path: '/tmp/bestlyg-server-dist',
            filename: 'main.mjs',
            chunkFilename: '[name].mjs',
            module: true,
            library: { type: 'module' },
            chunkFormat: 'module',
            chunkLoading: 'import',
        });
        expect(config.optimization).toMatchObject({
            splitChunks: false,
            minimize: false,
            runtimeChunk: false,
        });
        expect(config.watchOptions).toEqual({
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'],
        });
    });

    it('preserves Nest library entry filenames with the ESM extension', () => {
        const options = createOptions();
        const config = createRspackConfig({
            ...options,
            output: { ...options.output, filename: 'libs/api/index.js' },
        });
        expect(config.output.filename).toBe('libs/api/index.mjs');
    });

    it('keeps production builds debuggable only through emitted code and does not add production-only plugins', () => {
        process.env.NODE_ENV = 'production';
        delete process.env.BUILD_TYPE;
        const options = createOptions();

        const config = createRspackConfig(options);

        expect(config.mode).toBe('production');
        expect(config.cache).toBe(false);
        expect(config.devtool).toBe(false);
        expect(config.plugins.slice(0, -1)).toEqual(options.plugins);
        expect(config.incremental).toBe(false);
    });

    it('uses native SWC with Nest decorator metadata during bundling', () => {
        process.env.NODE_ENV = 'development';

        const config = createRspackConfig(createOptions());

        expect(config.module.rules).toEqual([
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'builtin:swc-loader',
                        options: {
                            jsc: {
                                parser: { syntax: 'typescript', decorators: true },
                                transform: {
                                    legacyDecorator: true,
                                    decoratorMetadata: true,
                                },
                                target: 'es2022',
                            },
                        },
                    },
                ],
            },
        ]);
    });

    it('uses the Rspack builder and keeps type checking outside the build', () => {
        const cliConfig = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, '../nest-cli.json'), 'utf8'),
        );
        expect(cliConfig.compilerOptions.builder).toEqual({
            type: 'rspack',
            options: { configPath: 'rspack.config.mts' },
        });
        const checker = { constructor: { name: 'ForkTsCheckerWebpackPlugin' }, apply: () => {} };
        const options = createOptions();
        const config = createRspackConfig({
            ...options,
            plugins: [...options.plugins, checker],
        });
        expect(config.plugins.slice(0, -1)).toEqual(options.plugins);
    });

    it.each([false, true])(
        'flushes a finished compiler but preserves watch mode (%s)',
        (watchMode) => {
            const plugin = createRspackConfig(createOptions()).plugins.at(
                -1,
            ) as RspackPluginInstance;
            let afterDone: () => void;
            const close = rs.fn((callback) => callback());
            plugin.apply({
                watchMode,
                close,
                hooks: {
                    afterDone: {
                        tap: (_name: string, callback: () => void) => {
                            afterDone = callback;
                        },
                    },
                },
            } as unknown as Compiler);
            afterDone!();
            expect(close).toHaveBeenCalledTimes(watchMode ? 0 : 1);
        },
    );
});

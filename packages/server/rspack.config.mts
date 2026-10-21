import type { Compiler, Configuration, RspackPluginInstance } from '@rspack/core';
import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const configPath = fileURLToPath(import.meta.url);
const configDir = path.dirname(configPath);
const pkgs = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
    dependencies: Record<string, string>;
};

const externalDependencies = Object.keys(pkgs.dependencies).filter(
    (name) => !name.startsWith('@bestlyg/'),
);

class CloseCompilerAfterBuildPlugin implements RspackPluginInstance {
    apply(compiler: Compiler): void {
        // Nest CLI 12 calls compiler.run() without close(). Rspack needs close()
        // to flush its persistent cache and release native compiler resources.
        compiler.hooks.afterDone.tap('CloseCompilerAfterBuildPlugin', () => {
            if (compiler.watchMode) return;
            compiler.close((error) => {
                if (error) {
                    console.error(error);
                    process.exitCode = 1;
                }
            });
        });
    }
}

export default function createRspackConfig(options: Configuration) {
    const isDevBuild = process.env.NODE_ENV === 'development' || process.env.BUILD_TYPE === 'dev';

    return {
        ...options,
        mode: isDevBuild ? 'development' : 'production',
        output: {
            ...options.output,
            filename:
                typeof options.output?.filename === 'string'
                    ? options.output.filename.replace(/\.js$/, '.mjs')
                    : '[name].mjs',
            chunkFilename: '[name].mjs',
            module: true,
            library: { type: 'module' },
            chunkFormat: 'module',
            chunkLoading: 'import',
        },
        optimization: { ...options.optimization, minimize: false, runtimeChunk: false },
        // Rspack 2 enables output modules and top-level await by default.
        experiments: {},
        // Nest's default externals function may emit CommonJS. Keep all external
        // imports native while bundling workspace aliases from their TS sources.
        externalsPresets: { node: false },
        externalsType: 'module',
        externals: [
            ({ request }, callback) => {
                if (
                    request &&
                    (request.startsWith('node:') ||
                        builtinModules.includes(request) ||
                        externalDependencies.some(
                            (name) => request === name || request.startsWith(`${name}/`),
                        ))
                )
                    return callback(null, `module ${request}`);
                callback();
            },
        ],
        watchOptions: {
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'],
        },
        plugins: [
            ...(options.plugins ?? []).filter(
                (plugin) => !plugin || plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin',
            ),
            new CloseCompilerAfterBuildPlugin(),
        ],
        cache: isDevBuild
            ? {
                  type: 'persistent',
                  buildDependencies: [
                      configPath,
                      path.resolve(configDir, 'package.json'),
                      path.resolve(configDir, 'tsconfig.json'),
                      path.resolve(configDir, 'tsconfig.build.json'),
                  ],
              }
            : false,
        incremental: isDevBuild,
        devtool: isDevBuild ? 'eval-cheap-module-source-map' : false,
        module: {
            rules: [
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
            ],
        },
    } satisfies Configuration;
}

import { createRequire } from 'node:module';
import path from 'node:path';
import { Script } from 'node:vm';
import fs from 'node:fs';

const webpackConfigPath = path.resolve(__dirname, '../webpack.config.js');

function loadWebpackConfig() {
    const module = { exports: {} };
    const requireFromConfig = createRequire(webpackConfigPath);
    const source = fs.readFileSync(webpackConfigPath, 'utf8');

    new Script(source, { filename: webpackConfigPath }).runInNewContext({
        __dirname: path.dirname(webpackConfigPath),
        __filename: webpackConfigPath,
        console,
        module,
        exports: module.exports,
        process,
        require: requireFromConfig,
    });

    return module.exports as (options: Record<string, unknown>) => Record<string, any>;
}

describe('server webpack config', () => {
    const originalNodeEnv = process.env.NODE_ENV;
    const originalBuildType = process.env.BUILD_TYPE;

    const createOptions = () => ({
        output: { path: '/tmp/bestlyg-server-dist' },
        optimization: { splitChunks: false },
        externals: ['existing-external'],
        plugins: [{ name: 'existing-plugin' }],
    });

    afterEach(() => {
        process.env.NODE_ENV = originalNodeEnv;
        process.env.BUILD_TYPE = originalBuildType;
    });

    it('enables fast rebuild settings for development builds', () => {
        process.env.NODE_ENV = 'development';
        delete process.env.BUILD_TYPE;

        const config = loadWebpackConfig()(createOptions());

        expect(config.mode).toBe('development');
        expect(config.cache).toEqual({ type: 'filesystem', allowCollectingMemory: true });
        expect(config.devtool).toBe('eval-cheap-module-source-map');
        expect(config.output).toMatchObject({
            path: '/tmp/bestlyg-server-dist',
            chunkFormat: 'array-push',
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

    it('keeps production builds debuggable only through emitted code and does not add production-only plugins', () => {
        process.env.NODE_ENV = 'production';
        delete process.env.BUILD_TYPE;
        const options = createOptions();

        const config = loadWebpackConfig()(options);

        expect(config.mode).toBe('production');
        expect(config.cache).toBe(false);
        expect(config.devtool).toBe(false);
        expect(config.plugins).toBe(options.plugins);
    });

    it('transpiles TypeScript without type checking during bundling', () => {
        process.env.NODE_ENV = 'development';

        const config = loadWebpackConfig()(createOptions());

        expect(config.module.rules).toEqual([
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: expect.stringContaining('tsconfig.build.json'),
                            context: expect.stringContaining('packages/server'),
                        },
                    },
                ],
            },
        ]);
    });
});

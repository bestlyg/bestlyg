const path = require('path');
const pkgs = require('./package.json');

const externalDependencies = Object.keys(pkgs.dependencies).filter(
    (name) => !name.startsWith('@bestlyg/'),
);

module.exports = function (options) {
    const isDevBuild = process.env.NODE_ENV === 'development' || process.env.BUILD_TYPE === 'dev';

    return {
        ...options,
        mode: isDevBuild ? 'development' : 'production',
        output: {
            ...options.output,
            chunkFormat: 'array-push',
        },
        optimization: { ...options.optimization, minimize: false, runtimeChunk: false },
        externals: [...(options.externals ?? []), ...externalDependencies],
        watchOptions: {
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**'],
        },
        plugins: options.plugins,
        cache: isDevBuild ? { type: 'filesystem', allowCollectingMemory: true } : false,
        devtool: isDevBuild ? 'eval-cheap-module-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                configFile: path.resolve(__dirname, 'tsconfig.build.json'),
                                context: __dirname,
                            },
                        },
                    ],
                },
            ],
        },
    };
};

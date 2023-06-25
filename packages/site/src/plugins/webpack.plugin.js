const path = require('path');
const webpack = require('webpack');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
/**
 * @param  {...string} p
 * @returns {string}
 */
const resolve = (...p) => path.resolve(__dirname, '../../', ...p);

module.exports = function () {
    return {
        configureWebpack(config, isServer, utils, content) {
            console.log('webpack plugin');
            console.log({
                config,
                isServer,
                utils,
                content,
            });
            return {
                experiments: { syncWebAssembly: true, asyncWebAssembly: true },
                cache: { type: 'filesystem' },
                // proxy: {},
                plugins: [
                    // new WasmPackPlugin({
                    //   crateDirectory: path.resolve(__dirname, '.'),
                    // }),
                    // new webpack.ProvidePlugin({
                    //   TextDecoder: ['text-encoding', 'TextDecoder'],
                    //   TextEncoder: ['text-encoding', 'TextEncoder'],
                    // }),
                ],
                resolve: {
                    alias: {
                        '@': resolve(),
                    },
                },
            };
        },
    };
};

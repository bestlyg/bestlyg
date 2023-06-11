/* eslint-disable strict */
const { resolve, IS_PROD, IS_DEV } = require('./utils');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');

module.exports = (env, argv) =>
    merge(IS_PROD ? productionConfig(env, argv) : developmentConfig(env, argv), {
        entry: resolve('client/src/main.ts'),
        output: {
            path: resolve('client/dist'),
            filename: '[name].[contenthash].js',
            library: {
                type: 'umd',
            },
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-react',
                                        {
                                            runtime: 'automatic',
                                            development: IS_DEV
                                        },
                                    ],
                                    [
                                        '@babel/preset-typescript',
                                        {
                                            isTSX: true,
                                            allExtensions: true,
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            alias: {
                '@': resolve('client/src'),
            },
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        plugins: [new HtmlWebpackPlugin()],
    });

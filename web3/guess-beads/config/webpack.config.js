/* eslint-disable strict */
const { resolve, IS_PROD, IS_DEV } = require('./utils');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');
const webpack = require('webpack');

module.exports = (env, argv) =>
    merge(IS_PROD ? productionConfig(env, argv) : developmentConfig(env, argv), {
        entry: resolve('src/main.tsx'),
        output: {
            path: resolve('dist'),
            filename: '[name].[contenthash].js',
            library: {
                type: 'umd',
            },
            clean: true,
            publicPath: '/public/guess-beads',
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
                                            development: IS_DEV,
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
                {
                    test: /\.module.css$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                modules: {
                                    // auto: (resourcePath) => resourcePath.endsWith('.less'),  // 匹配.less文件来进行css模块化。
                                    localIdentName: '[local]_[hash:base64:10]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    exclude: /\.module.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                '@': resolve('src'),
            },
            extensions: ['.js', '.json', '.ts', '.tsx'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                assert: require.resolve('assert'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify'),
                url: require.resolve('url'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'BestLyg Traning',
                template: resolve('index.html'),
                inject: true,
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
    });

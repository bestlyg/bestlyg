/* eslint-disable strict */
const { resolve, IS_PROD, IS_DEV } = require('./utils');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');

module.exports = (env, argv) =>
    merge(IS_PROD ? productionConfig(env, argv) : developmentConfig(env, argv), {
        entry: resolve('client/src/main.tsx'),
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
                {
                    test: /\.module.less$/i,
                    use: ['style-loader', 'css-loader', 'less-loader'],
                },
                {
                    test: /\.less$/i,
                    exclude: /\.module.less$/i,
                    use: ['style-loader', 'css-loader', 'less-loader'],
                },
                {
                    test: /\.module.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                '@': resolve('client/src'),
            },
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'BestLyg Traning',
                template: resolve('index.html'),
                inject: true,
            }),
        ],
    });

import chalk from 'chalk';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { config as babelConfig } from '../babel';
import { config as tsConfig } from '../typescript';
import {
    CWD,
    DIR_NAME_UMD,
    DIR_NAME_SOURCE,
    FILE_NAME_ENTRY_SCRIPT,
    FILE_NAME_PACKAGE_JSON,
    packageNameWithoutScope,
    workPackageInfo,
    resolve,
} from '../../utils';
import { WebpackConfig } from './interface';

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getUse(cssModule: boolean) {
    const options = cssModule
        ? {
              modules: {
                  localIdentName: '[local]-[hash:10]',
              },
          }
        : {};
    return [
        {
            loader: require.resolve('style-loader'),
        },
        {
            loader: require.resolve('css-loader'),
            options,
        },
        {
            loader: require.resolve('less-loader'),
            options: {
                lessOptions: { javascriptEnabled: true },
            },
        },
    ];
}

export const config: WebpackConfig = {
    mode: 'production',
    entry: {
        [packageNameWithoutScope]: resolve(CWD, DIR_NAME_SOURCE, FILE_NAME_ENTRY_SCRIPT),
    },
    output: {
        path: `${CWD}/${DIR_NAME_UMD}`,
        publicPath: `https://unpkg.com/${workPackageInfo.name}@latest/${DIR_NAME_UMD}/`,
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: babelConfig,
                    },
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            compilerOptions: {
                                ...tsConfig,
                                declaration: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    {
                        loader: require.resolve('style-loader'),
                    },
                    {
                        loader: require.resolve('css-loader'),
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
                loader: require.resolve('file-loader'),
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.svg$/,
                use: [require.resolve('@svgr/webpack')],
            },
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getUse(false),
            },
            {
                test: lessModuleRegex,
                use: getUse(true),
            },
        ],
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        },
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    resolveLoader: {
        // modules: ['node_modules/arco-scripts/node_modules', 'node_modules'],
    },
    plugins: [
        // new ProgressBarPlugin({
        //     format: `[best-tools]: [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        // }),
        new webpack.BannerPlugin({
            banner: `${packageNameWithoutScope} v${workPackageInfo.version}\n\nCopyright 1997-present, BestLyg, Inc.\nAll rights reserved.\n`,
        }),
    ],
};

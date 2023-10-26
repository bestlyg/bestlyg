import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import fs from 'fs-extra';
import LessAutoprefix from 'less-plugin-autoprefix';
import NpmImportPlugin from 'less-plugin-npm-import';
import LessPluginFunctions from 'less-plugin-functions';

const npmImport = new NpmImportPlugin({ prefix: '~' });
const autoprefix = new LessAutoprefix();
const lessPluginFunctions = new LessPluginFunctions();

const resolve = (...p: string[]) => path.resolve(__dirname, '../', ...p);
const componentsPath = resolve('components');
const packagesPath = resolve('packages');
function aliasBestLib() {
    const o: Record<string, string> = {};
    for (const dir of fs.readdirSync(componentsPath)) {
        const p = resolve(componentsPath, dir);
        o[require(resolve(p, 'package.json')).name] = p;
    }
    for (const dir of fs.readdirSync(packagesPath)) {
        const p = resolve(packagesPath, dir);
        o[require(resolve(p, 'package.json')).name] = p;
    }
    return o;
}
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
                lessOptions: {
                    javascriptEnabled: true,
                    plugins: [
                        // npmImport, autoprefix, lessPluginFunctions
                    ],
                },
            },
        },
    ];
}

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return path.dirname(require.resolve(path.join(value, 'package.json')));
}
const config: StorybookConfig = {
    stories: [
        resolve('stories/**/*.mdx'),
        resolve('stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'),
        resolve(componentsPath, '**/__demo__', '**/*.mdx'),
        resolve(componentsPath, '**/__demo__', '**/*.stories.@(js|jsx|mjs|ts|tsx)'),
        resolve(packagesPath, '**/__demo__', '**/*.mdx'),
        resolve(packagesPath, '**/__demo__', '**/*.stories.@(js|jsx|mjs|ts|tsx)'),
    ],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-styling-webpack'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal(config) {
        for (const [k, v] of Object.entries(aliasBestLib())) {
            config.resolve!.alias![k] = v;
        }
        config.resolve!.alias!['react'] = getAbsolutePath('react');
        config.resolve!.alias!['react-dom'] = getAbsolutePath('react-dom');
        console.log(config.resolve!.alias);
        (config as any).module.rules.push(
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getUse(false),
            },
            {
                test: lessModuleRegex,
                use: getUse(true),
            }
        );
        (config as any).module.rules[2].use[0].options.presets.push('@babel/preset-typescript');
        return config;
    },
};
export default config;

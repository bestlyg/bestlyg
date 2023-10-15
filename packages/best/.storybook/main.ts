import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import fs from 'fs-extra';

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
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return path.dirname(require.resolve(path.join(value, 'package.json')));
}
const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-interactions'),
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
        (config as any).module.rules[2].use[0].options.presets.push('@babel/preset-typescript');
        return config;
    },
};
export default config;

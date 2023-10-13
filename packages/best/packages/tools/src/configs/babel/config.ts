import { BabelConfig } from './interface';
import presetEnv from '@babel/preset-env';
import presetTs from '@babel/preset-typescript';
import presetReact from '@babel/preset-react';
import pluginExportDefault from '@babel/plugin-proposal-export-default-from';
// import pluginTransformRuntime from '@babel/plugin-transform-runtime';
import pluginDynamicImport from '@babel/plugin-syntax-dynamic-import';
import pluginClass from '@babel/plugin-proposal-class-properties';
// import pluginJsx from '@babel/plugin-transform-react-jsx-source';

export const config: BabelConfig = {
    filename: '',
    presets: [
        [presetEnv, { useBuiltIns: 'entry', corejs: '3' }],
        presetTs,
        [
            presetReact,
            {
                runtime: 'automatic',
                // pragma: 'dom', // default pragma is React.createElement (only in classic runtime)
                // pragmaFrag: 'DomFrag', // default is React.Fragment (only in classic runtime)
                // throwIfNamespace: false, // defaults to true
                // runtime: 'classic', // defaults to classic
                // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
            },
        ],
    ],
    plugins: [
        pluginExportDefault,
        // pluginTransformRuntime,
        pluginDynamicImport,
        pluginClass,
        // pluginJsx,
    ],
    configFile: false,
    // cwd: resolve(),
};

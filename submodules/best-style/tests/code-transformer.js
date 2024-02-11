const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');
const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const presetTs = require('@babel/preset-typescript');

module.exports = {
    process(src, filename) {
        const result = transform(src, {
            filename,
            presets: [
                jestPreset,
                presetEnv,
                [
                    presetReact,
                    {
                        runtime: 'automatic'
                    }
                ],
                presetTs
            ]
        });
        return result || src;
    }
};

const path = require('node:path');
const { getPackageJson } = require('@less-plugins/get-package-json');
const packageName = 'package.json';
const hash = require('@emotion/hash').default;

module.exports = class LessPluginsGetHashedVersion {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const fnList = [
            function getHashedVersion() {
                return getPackageJson.call(this, {
                    less,
                    rootPath: '',
                    key: 'version',
                    transform: hash,
                });
            },
        ];
        for (const fn of fnList) {
            functions.add(fn.name, fn);
        }
    }
};

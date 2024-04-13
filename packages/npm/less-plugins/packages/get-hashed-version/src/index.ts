const path = require('path');
const { addFunctions } = require('@less-plugins/shared');
const { getPackageJson } = require('@less-plugins/get-package-json');
const hash = require('@emotion/hash').default;

module.exports = class LessPluginsGetHashedVersion {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        addFunctions(functions, [
            function getHashedVersion() {
                return getPackageJson.call(this, {
                    less,
                    rootPath: '',
                    key: 'version',
                    transform: hash,
                });
            },
        ]);
    }
};

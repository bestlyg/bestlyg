const path = require('path');
const { findClosestFile, addFunctions } = require('@less-plugins/shared');
const packageName = 'package.json';
const get = require('lodash.get');

function getPackageJson(config: {
    less: any;
    rootPath: string;
    key: string;
    transform: string | ((v: any) => any);
}) {
    const { less, rootPath, key, transform } = config;
    try {
        const dirPath = this.currentFileInfo.currentDirectory;
        const pkgPath = rootPath
            ? path.resolve(dirPath, rootPath)
            : findClosestFile({ dirPath, fileName: packageName });
        if (!pkgPath) return '';
        let transformFn: (v: any) => any = v => v;
        if (typeof transform === 'string') transformFn = eval(transform);
        else if (typeof transform === 'function') transformFn = transform;
        const res = transformFn(get(require(pkgPath), key));
        return new less.tree.Keyword(res);
    } catch (_) {
        return '';
    }
}

module.exports = class LessPluginsGetPackageJson {
    static getPackageJson = getPackageJson;
    constructor() {}
    setOptions(args) {}
    printUsage() {
        // console.log('less-plugin-get-package');
    }
    install(less, pluginMenager, functions) {
        // console.log("less install");
        addFunctions(functions, [
            function getPackageJson(rootPath, key, transform) {
                return getPackageJson.call(this, {
                    less,
                    rootPath: rootPath.value,
                    key: key.value,
                    transform: transform.value,
                });
            },
        ]);
    }
};

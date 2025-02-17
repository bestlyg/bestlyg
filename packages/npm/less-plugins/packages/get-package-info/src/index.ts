import {
    addFunctions,
    getPackageJsonField,
    getCurrentPackageName,
    getCurrentPackageScope,
} from '@less-plugins/shared';

export default class LessPluginsGetPackageInfo {
    constructor() {}
    printUsage() {}
    install(less, _pluginManager, functions) {
        addFunctions(functions, [
            {
                getPackageJsonField: function (rootPath, key, transform) {
                    return new less.tree.Keyword(
                        getPackageJsonField(
                            rootPath?.value ?? this.currentFileInfo.currentDirectory,
                            key?.value,
                            transform?.value,
                        ) ?? '',
                    );
                },
                getCurrentPackageName: function (rootPath) {
                    return new less.tree.Keyword(
                        getCurrentPackageName(
                            rootPath?.value ?? this.currentFileInfo.currentDirectory,
                        ) ?? '',
                    );
                },
                getCurrentPackageScope: function (rootPath) {
                    return new less.tree.Keyword(
                        getCurrentPackageScope(
                            rootPath?.value ?? this.currentFileInfo.currentDirectory,
                        ) ?? '',
                    );
                },
            },
        ]);
    }
}

import { addFunctions, getCurrentPackageScope } from '@less-plugins/shared';

export default class LessPluginsGetCurrentPackageScope {
    constructor() {}
    printUsage() {}
    install(less, _pluginManager, functions) {
        addFunctions(functions, [
            {
                getCurrentPackageScope: function (rootPath, _key, _transform) {
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

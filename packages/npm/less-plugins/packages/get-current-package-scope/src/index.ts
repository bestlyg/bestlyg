import { addFunctions, getCurrentPackageScope } from '@less-plugins/shared';

export default class LessPluginsGetCurrentPackageScope {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        addFunctions(functions, [
            {
                getCurrentPackageScope: function (rootPath, key, transform) {
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

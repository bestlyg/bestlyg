import { addFunctions, getCurrentPackageName } from '@less-plugins/shared';

export default class LessPluginsGetCurrentPackageName {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        addFunctions(functions, [
            {
                getCurrentPackageName: function (rootPath, key, transform) {
                    return new less.tree.Keyword(
                        getCurrentPackageName(
                            rootPath?.value ?? this.currentFileInfo.currentDirectory
                        ) ?? ''
                    );
                },
            },
        ]);
    }
}

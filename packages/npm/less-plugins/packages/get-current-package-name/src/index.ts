import { addFunctions, getCurrentPackageName } from '@less-plugins/shared';

export default class LessPluginsGetCurrentPackageName {
    constructor() {}
    printUsage() {}
    install(less, _pluginMenager, functions) {
        addFunctions(functions, [
            {
                getCurrentPackageName: function (this: any, rootPath, _key, _transform) {
                    return new less.tree.Keyword(
                        getCurrentPackageName(
                            rootPath?.value ?? this.currentFileInfo.currentDirectory,
                        ) ?? '',
                    );
                },
            },
        ]);
    }
}

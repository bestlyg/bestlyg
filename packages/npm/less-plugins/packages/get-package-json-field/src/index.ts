import { addFunctions, getPackageJsonField } from '@less-plugins/shared';

export default class LessPluginsGetLibraryInfo {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        addFunctions(functions, [
            {
                getPackageJsonField: function (rootPath, key, transform) {
                    return new less.tree.Keyword(
                        getPackageJsonField(
                            rootPath?.value || this.currentFileInfo.currentDirectory,
                            key?.value,
                            transform?.value
                        ) ?? ''
                    );
                },
            },
        ]);
    }
}

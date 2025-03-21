import { addFunctions, getPackageJsonField } from '@less-plugins/shared';
import hash from '@emotion/hash';

export default class LessPluginsGetHashedVersion {
    constructor() {}
    printUsage() {}
    install(_less, _pluginMenager, functions) {
        addFunctions(functions, [
            function getHashedVersion(rootPath) {
                return getPackageJsonField(
                    rootPath?.value || this.currentFileInfo.currentDirectory,
                    'version',
                    hash,
                );
            },
        ]);
    }
}

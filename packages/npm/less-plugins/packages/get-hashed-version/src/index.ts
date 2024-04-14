import { addFunctions } from '@less-plugins/shared';
import { getPackageJson } from '@less-plugins/get-package-json';
import hash from '@emotion/hash';

export default class LessPluginsGetHashedVersion {
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
}

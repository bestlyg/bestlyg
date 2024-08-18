import { addFunctions } from '@less-plugins/shared';

export default class LessPluginsGetEnv {
    constructor() {}
    printUsage() {}
    install(_less, _pluginManager, functions) {
        addFunctions(functions, [
            function getEnv(key) {
                key = key?.value;
                return process.env[key];
            },
        ]);
    }
}

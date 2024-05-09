import { addFunctions } from '@less-plugins/shared';

export default class LessPluginsGetEnv {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        addFunctions(functions, [
            function getEnv(key) {
                key = key?.value;
                return process.env[key];
            },
        ]);
    }
}

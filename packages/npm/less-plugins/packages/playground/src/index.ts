import { addFunctions } from '@less-plugins/shared';
import path from 'path';

export default class LessPluginsReplaceProperties {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, string>();
        // pluginMenager.addVisitor(
        //     new ReplacePropertiesVisitor(less, pluginMenager, functions, replaceMap)
        // );
        addFunctions(functions, [
            function addReplacePreperties(key, replaceKey) {
                replaceMap.set(key.value, replaceKey.value);
                return '';
            },
            function removeReplacePreperties(key) {
                replaceMap.delete(key.value);
                return '';
            },
        ]);
    }
}

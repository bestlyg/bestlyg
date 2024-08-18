import { addFunctions } from '@less-plugins/shared';

export default class LessPluginsReplaceProperties {
    constructor() {}
    printUsage() {}
    install(_less, _pluginManager, functions) {
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

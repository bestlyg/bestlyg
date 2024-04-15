import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';
import { replaceDataList } from './replace-data';

export { replaceDataList } from './replace-data';

export default class LessPluginsCssLogical {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, ReplaceData>();
        for (const replaceData of replaceDataList) {
            addReplacePreperties({
                ...replaceData,
                replaceMap,
            });
        }
        pluginMenager.addVisitor(new ReplacePropertiesVisitor(replaceMap));
    }
}

import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';
import { cssLogicalMap } from './replace-data';

export { cssLogicalMap } from './replace-data';

export default class LessPluginsCssLogical {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, ReplaceData>();
        for (const replaceData of cssLogicalMap) {
            addReplacePreperties({
                ...replaceData,
                replaceMap,
            });
        }
        pluginMenager.addVisitor(new ReplacePropertiesVisitor(replaceMap));
    }
}

import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';
import { cssLogicalMap } from './replace-data';

export { cssLogicalMap } from './replace-data';

export default class LessPluginsCssLogical {
    constructor() {}
    printUsage() {}
    install(_less, pluginManager, _functions) {
        const replaceMap = new Map<string, ReplaceData>();
        for (const replaceData of cssLogicalMap) {
            addReplacePreperties({
                ...replaceData,
                replaceMap,
            });
        }
        pluginManager.addVisitor(new ReplacePropertiesVisitor(replaceMap));
    }
}

const { addFunctions } = require('@less-plugins/shared');
const {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    removeReplacePreperties,
} = require('@less-plugins/replace-properties');
const path = require('path');
const { replaceDataList } = require('./replace-data');

module.exports = class LessPluginsReplaceProperties {
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map();
        for (const replaceData of replaceDataList) {
            addReplacePreperties({
                ...replaceData,
                replaceMap,
            });
        }

        pluginMenager.addVisitor(
            new ReplacePropertiesVisitor(less, pluginMenager, functions, replaceMap)
        );
    }
};

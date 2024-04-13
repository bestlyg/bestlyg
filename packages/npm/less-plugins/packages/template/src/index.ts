const { addFunctions } = require('@less-plugins/shared');
const path = require('path');
const packageName = 'package.json';

class ReplacePropertiesVisitor {
    visitor;
    constructor(
        public less: any,
        public pluginMenager: any,
        public functions: any,
        public replaceMap: Map<string, string>
    ) {
        this.visitor = new less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }

    visitDeclaration(node) {
        const name = node.name;
        const replaceKey = this.replaceMap.get(name);
        if (replaceKey) node.name = replaceKey;
        return node;
    }
}

module.exports = class LessPluginsReplaceProperties {
    static ReplacePropertiesVisitor = ReplacePropertiesVisitor;
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, string>();
        pluginMenager.addVisitor(
            new ReplacePropertiesVisitor(less, pluginMenager, functions, replaceMap)
        );
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
};

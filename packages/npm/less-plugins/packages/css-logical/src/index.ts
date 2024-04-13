const { addFunctions, getLessTreeNodeConstructor } = require('@less-plugins/shared');
const {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    removeReplacePreperties,
} = require('@less-plugins/replace-properties');
const path = require('path');
const { replaceDataList } = require('./replace-data');

class CssLogicalPreVisitor {
    static isPreVisitor = true;
    visitor;
    constructor(public less: any, public pluginMenager: any, public functions: any) {
        this.visitor = new less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }

    visitDeclaration(node) {
        // console.log('===>pre', node, getLessTreeNodeConstructor(this.less, node.value));
        if (
            node.name === 'margin' &&
            Array.isArray(node.value?.value) &&
            node.value.value.length === 4
        ) {
            // console.log('inin', getLessTreeNodeConstructor(node));
            const LeftConsuctor = getLessTreeNodeConstructor(node.value.value[1]);
            const RightConsuctor = getLessTreeNodeConstructor(node.value.value[3]);
            return new this.less.tree.Ruleset(
                [new this.less.tree.Selector([new this.less.tree.Element('', '&')])],
                [
                    node,
                    new this.less.tree.Declaration(
                        'margin-left',
                        Object.assign(new LeftConsuctor(), node.value.value[1])
                    ),
                    new this.less.tree.Declaration(
                        'margin-right',
                        Object.assign(new RightConsuctor(), node.value.value[3])
                    ),
                ]
            );
        }
        return node;
    }
}

class CssLogicalVisitor extends ReplacePropertiesVisitor {
    constructor(less, pluginMenager, functions, replaceMap) {
        super(less, pluginMenager, functions, replaceMap);
    }

    visitDeclaration(node) {
        console.log('===>post', node, getLessTreeNodeConstructor(this.less, node.value));
        return super.visitDeclaration(node);
    }
}

module.exports = class LessPluginsCssLogical {
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

        pluginMenager.addVisitor(new CssLogicalPreVisitor(less, pluginMenager, functions));
        pluginMenager.addVisitor(new CssLogicalVisitor(less, pluginMenager, functions, replaceMap));
    }
};

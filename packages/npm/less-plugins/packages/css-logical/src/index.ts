import { cloneLessTreeNode, LESS_PLUGINS } from '@less-plugins/shared';
import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';
import { replaceDataList } from './replace-data';

export { replaceDataList } from './replace-data';

const REG_Node = new RegExp('^(inset|margin|padding)$');

function pickShorthandsValue(node) {
    const value = node.value?.value;
    if (Array.isArray(value) && value.length === 4) {
        return value;
    } else if (typeof value === 'string') {
        const splitValue = value.split(' ').filter(Boolean);
        if (splitValue.length === 4) return splitValue;
    }
    return null;
}

export class CssLogicalPreVisitor {
    isPreVisitor = !false;
    isReplacing = !false;
    visitor;
    constructor() {
        this.visitor = new LESS_PLUGINS.less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }
    visitRuleset(node) {
        const appendRuleset = new LESS_PLUGINS.less.tree.Ruleset(
            [new LESS_PLUGINS.less.tree.Selector('html[data-rtl] &')],
            []
        );
        for (let index = 0; index < node.rules.length; index++) {
            const rule = node.rules[index];
            const shorthandsValue = pickShorthandsValue(rule);
            if (REG_Node.test(rule.name) && shorthandsValue) {
                const newLeftNode = new LESS_PLUGINS.less.tree.Declaration(
                    rule.name + '-right',
                    typeof shorthandsValue[1] === 'string'
                        ? shorthandsValue[1]
                        : cloneLessTreeNode(LESS_PLUGINS.less, shorthandsValue[1])
                );
                const newRightNode = new LESS_PLUGINS.less.tree.Declaration(
                    rule.name + '-left',
                    typeof shorthandsValue[3] === 'string'
                        ? shorthandsValue[3]
                        : cloneLessTreeNode(LESS_PLUGINS.less, shorthandsValue[3])
                );
                newLeftNode.skipVisitDeclaration = true;
                newRightNode.skipVisitDeclaration = true;
                appendRuleset.rules.push(newLeftNode, newRightNode);
            }
        }
        if (appendRuleset.rules.length) node.rules.push(appendRuleset);
        return node;
    }
}

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
        pluginMenager.addVisitor(new CssLogicalPreVisitor());
        pluginMenager.addVisitor(new ReplacePropertiesVisitor(replaceMap));
    }
}

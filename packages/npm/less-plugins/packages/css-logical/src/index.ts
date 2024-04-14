import { cloneLessTreeNode } from '@less-plugins/shared';
import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';
import { replaceDataList } from './replace-data';
export { replaceDataList } from './replace-data';

export const skipNodeSet = new Set();
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
    isPreVisitor = true;
    isReplacing = true;
    visitedNodeSet = new Set();
    visitor;
    constructor(public less: any, public pluginMenager: any, public functions: any) {
        this.visitor = new less.visitors.Visitor(this);
    }

    run(root) {
        skipNodeSet.clear();
        return this.visitor.visit(root);
    }
    visitRuleset(node) {
        for (let index = 0; index < node.rules.length; index++) {
            const rule = node.rules[index];
            const shorthandsValue = pickShorthandsValue(rule);
            if (REG_Node.test(rule.name) && shorthandsValue) {
                const newLeftNode = new this.less.tree.Declaration(
                    rule.name + '-right',
                    typeof shorthandsValue[1] === 'string'
                        ? shorthandsValue[1]
                        : cloneLessTreeNode(this.less, shorthandsValue[1])
                );
                const newRightNode = new this.less.tree.Declaration(
                    rule.name + '-left',
                    typeof shorthandsValue[3] === 'string'
                        ? shorthandsValue[3]
                        : cloneLessTreeNode(this.less, shorthandsValue[3])
                );
                skipNodeSet.add(newLeftNode);
                skipNodeSet.add(newRightNode);
                node.rules.splice(index + 1, 0, newLeftNode, newRightNode);
                index += 2;
            }
        }
        return node;
    }
    // visitDeclaration(node) {
    //     const shorthandsValue = pickShorthandsValue(node);
    //     // console.log('===>pre', node, shorthandsValue);
    //     if (!this.visitedNodeSet.has(node) && REG_Node.test(node.name) && shorthandsValue) {
    //         this.visitedNodeSet.add(node);
    //         const newLeftNode = new this.less.tree.Declaration(
    //             node.name + '-right',
    //             typeof shorthandsValue[1] === 'string'
    //                 ? shorthandsValue[1]
    //                 : cloneLessTreeNode(this.less, shorthandsValue[1])
    //         );
    //         const newRightNode = new this.less.tree.Declaration(
    //             node.name + '-left',
    //             typeof shorthandsValue[3] === 'string'
    //                 ? shorthandsValue[3]
    //                 : cloneLessTreeNode(this.less, shorthandsValue[3])
    //         );
    //         skipNodeSet.add(newLeftNode);
    //         skipNodeSet.add(newRightNode);
    //         // return new this.less.tree.mixin.Definition('', [], [node, newLeftNode, newRightNode]);
    //         const ruleset = new this.less.tree.Ruleset(
    //             [
    //                 new this.less.tree.Selector([
    //                     // new this.less.tree.Element('', '&')
    //                     new this.less.tree.Element('', ''),
    //                 ]),
    //             ],
    //             [node, newLeftNode, newRightNode]
    //         );
    //         return ruleset;
    //     }
    //     return node;
    // }
}

export class CssLogicalVisitor extends ReplacePropertiesVisitor {
    constructor(less, pluginMenager, functions, replaceMap) {
        super(less, pluginMenager, functions, replaceMap);
    }

    visitDeclaration(node) {
        if (skipNodeSet.has(node)) return node;
        return super.visitDeclaration(node);
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

        pluginMenager.addVisitor(new CssLogicalPreVisitor(less, pluginMenager, functions));
        pluginMenager.addVisitor(new CssLogicalVisitor(less, pluginMenager, functions, replaceMap));
    }
}

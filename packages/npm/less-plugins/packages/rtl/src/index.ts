import { cloneLessTreeNode, LESS_PLUGINS, parseOptions } from '@less-plugins/shared';
import { SKIP_KEY } from '@less-plugins/replace-properties';
import { cssLogicalMap } from '@less-plugins/css-logical';
import {
    ReplacePropertiesVisitor,
    addReplacePreperties,
    ReplaceData,
} from '@less-plugins/replace-properties';

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

export class RtlPreVisitor {
    isPreVisitor = true;
    visitor;
    constructor(public lessPlugin: LessPluginsRtl) {
        this.visitor = new LESS_PLUGINS.less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }
    visitRuleset(node) {
        let appendRuleset = null;
        for (let index = 0; index < node.rules.length; index++) {
            const rule = node.rules[index];
            const shorthandsValue = pickShorthandsValue(rule);
            const cloneNode = (suffix: string, index: number) =>
                new LESS_PLUGINS.less.tree.Declaration(
                    rule.name + '-' + suffix,
                    typeof shorthandsValue[index] === 'string'
                        ? shorthandsValue[index]
                        : cloneLessTreeNode(LESS_PLUGINS.less, shorthandsValue[index]),
                );
            if (REG_Node.test(rule.name) && shorthandsValue) {
                if (this.lessPlugin.options.selector || this.lessPlugin.options.enableSelector) {
                    if (!appendRuleset) {
                        appendRuleset = new LESS_PLUGINS.less.tree.Ruleset(
                            [
                                new LESS_PLUGINS.less.tree.Selector(
                                    this.lessPlugin.options.selector ?? 'html[data-rtl] &',
                                ),
                            ],
                            [],
                        );
                        node.rules.splice(index + 1, 0, appendRuleset);
                        index += 1;
                    }
                    const newLeftNode = cloneNode('left', 1);
                    const newRightNode = cloneNode('right', 3);
                    newLeftNode[SKIP_KEY] = true;
                    newRightNode[SKIP_KEY] = true;
                    appendRuleset.rules.push(newLeftNode, newRightNode);
                } else {
                    const newTopNode = cloneNode('top', 0);
                    const newRightNode = cloneNode('right', 1);
                    const newBottomNode = cloneNode('bottom', 2);
                    const newLeftNode = cloneNode('left', 3);
                    node.rules.splice(
                        index,
                        1,
                        newTopNode,
                        newRightNode,
                        newBottomNode,
                        newLeftNode,
                    );
                    index += 3;
                }
            }
        }
        return node;
    }
}

export default class LessPluginsRtl {
    options: Record<string, any>;
    constructor() {}
    setOptions(options = '') {
        this.options = parseOptions(options);
        // console.log('===>', this.options);
    }
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, ReplaceData>();
        for (const replaceData of cssLogicalMap.filter(
            ({ key, value }) =>
                key?.includes('left') ||
                key?.includes('right') ||
                value?.includes('left') ||
                value?.includes('right'),
        )) {
            addReplacePreperties({
                ...replaceData,
                replaceMap,
            });
        }
        pluginMenager.addVisitor(new ReplacePropertiesVisitor(replaceMap));

        pluginMenager.addVisitor(new RtlPreVisitor(this));
    }
}

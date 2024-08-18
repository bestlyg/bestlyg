import { addFunctions, LESS_PLUGINS } from '@less-plugins/shared';
import { ReplaceData, toReg, getMapkey } from './utils';

export * from './utils';

export const SKIP_KEY = '__skipReplacePropertiesVisitor';

export class ReplacePropertiesVisitor {
    isPreVisitor = true;
    visitor;
    constructor(public replaceMap: Map<string, ReplaceData>) {
        this.visitor = new LESS_PLUGINS.less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }

    visitDeclaration(node) {
        if (node[SKIP_KEY]) return node;
        // console.log('===>', node, getLessTreeNodeConstructor(this.less, node.value));
        for (const { key, replaceKey, value, replaceValue } of this.replaceMap.values()) {
            // console.log('repalce', key, replaceKey, value, replaceValue);
            if (key) {
                const regKey = toReg(key);
                // console.log(
                //     `name = ${
                //         node.name
                //     }, key = ${key}, repkey = ${replaceKey}, reg = ${regKey}， test = ${regKey.test(
                //         node.name
                //     )}, replace = ${node.name.replace(regKey, replaceKey)}`
                // );
                if (!regKey.test(node.name)) continue;
                if (!value) {
                    node.name = node.name.replace(regKey, replaceKey);
                } else {
                    const regValue = toReg(value);
                    if (typeof node.value.value === 'string' && regValue.test(node.value.value)) {
                        node.name = node.name.replace(regKey, replaceKey);
                        node.value.value = node.value.value.replace(regValue, replaceValue);
                    }
                }
            } else {
                const regValue = toReg(value);
                if (typeof node.value.value === 'string' && regValue.test(node.value.value)) {
                    node.value.value = node.value.value.replace(regValue, replaceValue);
                }
            }
        }
        return node;
    }
}

export function addReplacePreperties({
    replaceMap,
    key,
    replaceKey,
    value,
    replaceValue,
}: { replaceMap: Map<string, ReplaceData> } & ReplaceData) {
    replaceMap.set(getMapkey(key, value), { key, value, replaceKey, replaceValue });
    return '';
}
export function removeReplacePreperties({
    replaceMap,
    key,
    value,
}: { replaceMap: Map<string, ReplaceData> } & ReplaceData) {
    replaceMap.delete(getMapkey(key, value));
    return '';
}

export default class LessPluginsReplaceProperties {
    constructor() {}
    printUsage() {}
    install(_less, pluginMenager, functions) {
        const replaceMap = new Map<string, ReplaceData>();
        pluginMenager.addVisitor(new ReplacePropertiesVisitor(replaceMap));
        addFunctions(functions, [
            {
                addReplacePreperties: function (key, replaceKey, value, replaceValue) {
                    // console.log('addReplacePreperties', key, replaceKey, value, replaceValue);
                    return addReplacePreperties.call(this, {
                        replaceMap,
                        key: key?.value,
                        replaceKey: replaceKey?.value,
                        value: value?.value,
                        replaceValue: replaceValue?.value,
                    });
                },
                removeReplacePreperties: function (key, value) {
                    return removeReplacePreperties.call(this, {
                        replaceMap,
                        key: key?.value,
                        value: value?.value,
                    });
                },
                addReplacePrepertiesKey: function (key, replaceKey) {
                    return addReplacePreperties.call(this, {
                        replaceMap,
                        key: key?.value,
                        replaceKey: replaceKey?.value,
                    });
                },
                addReplacePrepertiesValue: function (value, replaceValue) {
                    return addReplacePreperties.call(this, {
                        replaceMap,
                        value: value?.value,
                        replaceValue: replaceValue?.value,
                    });
                },
                removeReplacePrepertiesKey: function (key) {
                    return removeReplacePreperties.call(this, {
                        replaceMap,
                        key: key?.value,
                    });
                },
                removeReplacePrepertiesValue: function (value) {
                    return removeReplacePreperties.call(this, {
                        replaceMap,
                        value: value?.value,
                    });
                },
            },
        ]);
    }
}

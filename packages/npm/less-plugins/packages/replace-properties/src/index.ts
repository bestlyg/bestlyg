const { addFunctions, getLessTreeNodeConstructor } = require('@less-plugins/shared');
const path = require('path');

function getMapkey(key: string, value: string) {
    return `${key}|${value}`;
}

function toReg(key: string) {
    return new RegExp(`^${key}$`, 'i');
}

const REG_ANY = '[\\S\\s]*';

interface ReplaceData {
    key?: string;
    value?: string;
    replaceKey?: string;
    replaceValue?: string;
}

class ReplacePropertiesVisitor {
    visitor;
    constructor(
        public less: any,
        public pluginMenager: any,
        public functions: any,
        public replaceMap: Map<string, ReplaceData>,
        public isSkip: (v: any) => boolean = () => false
    ) {
        this.visitor = new less.visitors.Visitor(this);
    }

    run(root) {
        return this.visitor.visit(root);
    }

    visitDeclaration(node) {
        if (this.isSkip(node)) return node;
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

function addReplacePreperties({ replaceMap, key, replaceKey, value, replaceValue }) {
    replaceMap.set(getMapkey(key, value), { key, value, replaceKey, replaceValue });
    return '';
}
function removeReplacePreperties({ replaceMap, key, value }) {
    replaceMap.delete(getMapkey(key, value));
    return '';
}

module.exports = class LessPluginsReplaceProperties {
    static ReplacePropertiesVisitor = ReplacePropertiesVisitor;
    static addReplacePreperties = addReplacePreperties;
    static removeReplacePreperties = removeReplacePreperties;
    constructor() {}
    setOptions(args) {}
    printUsage() {}
    install(less, pluginMenager, functions) {
        const replaceMap = new Map<string, ReplaceData>();
        pluginMenager.addVisitor(
            new ReplacePropertiesVisitor(less, pluginMenager, functions, replaceMap)
        );
        addFunctions(functions, [
            {
                addReplacePreperties: function (key, replaceKey, value, replaceValue) {
                    console.log('addReplacePreperties', key, replaceKey, value, replaceValue);
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
};

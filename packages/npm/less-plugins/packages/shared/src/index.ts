import * as path from 'path';
import * as fs from 'fs';
/**
 * 获取最近祖先的文件
 * @param config
 * @returns 文件路径或者无路径
 */
export function findClosestFile(config: { dirPath: string; fileName: string }): string | null {
    let { dirPath, fileName } = config;
    while (!fs.existsSync(path.resolve(dirPath, fileName))) {
        const parentPath = path.dirname(dirPath);
        if (parentPath === dirPath) return null;
        dirPath = parentPath;
    }
    return path.resolve(dirPath, fileName);
}

export function addFunctions(functions, functionList: (Function | Record<string, Function>)[]) {
    for (const fn of functionList) {
        if (typeof fn === 'function') {
            functions.add(fn.name, fn);
        } else if (fn && typeof fn === 'object') {
            for (const [k, v] of Object.entries(fn)) {
                functions.add(k, v);
            }
        }
    }
}

export function getLessTreeNodeConstructor(less, node) {
    const tree = less.tree as Record<string, any>;
    for (const Constructor of Object.values(tree)) {
        if (Constructor !== tree.Node && node instanceof Constructor) {
            return Constructor;
        }
    }
    return tree.Node;
}

export function getFunctionArgs(func) {
    const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args
        .split(',')
        .map(arg => arg.replace(/\/\*.*\*\//, '').trim())
        .filter(Boolean);
}

export function cloneLessTreeNode(less, node) {
    const Conostructor = getLessTreeNodeConstructor(less, node);
    const args = getFunctionArgs(Conostructor).map(key => node[key]);
    const newNode = new Conostructor(...args);
    Object.assign(newNode, node);
    return newNode;
}

export function loadPlugin(module, require, registerPlugin, functions, tree, less, fileInfo) {
    if (!global.lessPluginVars) global.lessPluginVars = {};
    Object.assign(global.lessPluginVars, {
        module,
        require,
        registerPlugin,
        functions,
        tree,
        less,
        fileInfo,
    });
    return require(path.join(fileInfo.currentDirectory));
}

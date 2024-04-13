const path = require('path');
const fs = require('fs');

/**
 * 获取最近祖先的文件
 * @param config
 * @returns 文件路径或者无路径
 */
function findClosestFile(config: { dirPath: string; fileName: string }): string | null {
    let { dirPath, fileName } = config;
    while (!fs.existsSync(path.resolve(dirPath, fileName))) {
        const parentPath = path.dirname(dirPath);
        if (parentPath === dirPath) return null;
        dirPath = parentPath;
    }
    return path.resolve(dirPath, fileName);
}

function addFunctions(functions, functionList: (Function | Record<string, Function>)[]) {
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

function getLessTreeNodeConstructor(less, node) {
    const tree = less.tree as Record<string, any>;
    for (const Constructor of Object.values(tree)) {
        if (Constructor !== tree.Node && node instanceof Constructor) {
            return Constructor;
        }
    }
    return tree.Node;
}

module.exports = { findClosestFile, addFunctions, getLessTreeNodeConstructor };

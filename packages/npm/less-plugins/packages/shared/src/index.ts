export * from './constants';
export * from './parse-options';
export * from './find-closest-file';
export * from './load';
export * from './get-package-info';

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

export function getFunctionArgs(func: Function): string[] {
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

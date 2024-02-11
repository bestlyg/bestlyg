export const randomKey = Math.random().toString(36).slice(2);

export function getMarkKey(key: string) {
    return `__BestStyle_${key}_${randomKey}`;
}

export function mark<T>(node: object | null, key: string, value: T) {
    if (!node) return;
    node[getMarkKey(key)] = value;
}

export function unmark(node: object | null, key: string) {
    if (!node) return;
    delete node[getMarkKey(key)];
}

export function getMark<T>(node: object | null, key: string): T | null {
    if (!node) return null;
    return node[getMarkKey(key)];
}

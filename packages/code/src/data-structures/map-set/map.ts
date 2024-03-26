export interface Map<K, V> {
    size: number;
    empty: boolean;
    clear: () => void;
    contains: (key: K) => boolean;
    get: (key: K) => V | undefined;
    set: (key: K, val: V) => boolean;
    remove: (key: K) => boolean;
}

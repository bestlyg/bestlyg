export function mount<O extends object, T extends object>(base: O, mountRecord: T): O & T {
    const result: any = base as O & T;
    for (const [k, v] of Object.entries(mountRecord)) {
        result[k] = v;
    }
    return result;
}

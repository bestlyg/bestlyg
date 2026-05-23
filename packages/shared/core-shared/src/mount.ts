/** 将 mountRecord 的自有字段挂载到 base 上，并保留合并后的类型。 */
export function mount<O extends object, T extends object>(base: O, mountRecord: T): O & T {
    const result: any = base as O & T;
    for (const [k, v] of Object.entries(mountRecord)) {
        result[k] = v;
    }
    return result;
}

/**
 * 提取非下划线开头和非函数类型的key
 */
export type ExtractKeys<T> = Exclude<
    keyof T,
    {
        [P in keyof T]: P extends `_${string}` ? P : T[P] extends Function ? P : never;
    }[keyof T]
>;

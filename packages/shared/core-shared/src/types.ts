/**
 * 提取非下划线开头和非函数类型的key
 */
/** 提取对象中非下划线开头、非函数类型的公开字段 key。 */
export type ExtractKeys<T> = Exclude<
    keyof T,
    {
        [P in keyof T]: P extends `_${string}` ? P : T[P] extends Function ? P : never;
    }[keyof T]
>;

export type NonFunctionKeys<T> = Exclude<
    keyof T,
    { [P in keyof T]: T[P] extends Function ? P : never }[keyof T]
>;

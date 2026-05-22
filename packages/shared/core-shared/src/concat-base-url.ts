export type ConcatString<T, S extends string = ''> = T extends string
    ? `${S}${T}`
    : T extends (...args: infer P) => infer R
      ? (...args: P) => ConcatString<R, S>
      : T extends object
        ? {
              [key in keyof T]: ConcatString<T[key], S>;
          }
        : T;

export type ConcatBaseUrlReturnType<T> = ConcatString<T, '$BASE_URL'>;
/**
 * 递归处理每一条url，如果它是字符串，且没有BASE_URL前缀，就加上
 * 如果是对象就遍历后递归加上
 */
export function concatBaseUrl<T>(baseUrl: string, value: T): ConcatBaseUrlReturnType<T> {
    let res!: any;
    if (!value) res = value;
    else if (typeof value === 'string') {
        if (!value.startsWith(baseUrl)) {
            res = baseUrl + value;
        } else {
            res = value;
        }
    } else if (typeof value === 'function') {
        res = (...args: any[]) => concatBaseUrl(baseUrl, value(...args));
    } else if (typeof value === 'object') {
        res = Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, concatBaseUrl(baseUrl, v)]),
        );
    } else {
        res = value;
    }
    return res;
}

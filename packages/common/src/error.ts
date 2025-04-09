export enum ErrorEnum {
    /**
     * 与 eval() 有关
     */
    eval,
    /**
     * 数值变量或参数超出其有效范围
     */
    range,
    /**
     * 无效引用
     */
    reference,
    /**
     * eval()在解析代码的过程中发生的语法错误
     */
    syntax,
    /**
     * 变量或参数不属于有效类型
     */
    type,
    /**
     * 给 encodeURI()或  decodeURl()传递的参数无效
     */
    uri,
    /**
     * 普通错误
     */
    common,
}
const errorMap: Record<ErrorEnum, typeof Error> = {
    [ErrorEnum.eval]: TypeError,
    [ErrorEnum.range]: RangeError,
    [ErrorEnum.reference]: ReferenceError,
    [ErrorEnum.syntax]: SyntaxError,
    [ErrorEnum.type]: TypeError,
    [ErrorEnum.uri]: URIError,
    [ErrorEnum.common]: Error,
};
export function throwValue(val: unknown): never {
    throw val;
}
/**
 * 抛出错误
 * @param msg 报错信息
 * @param type 类型，默认为通用
 */
export const throwError = (msg: string, type: ErrorEnum = ErrorEnum.common): never => {
    throwValue(new errorMap[type](msg));
};
export function catchError<T>(
    fn: (...vals: any) => T,
    errorFn: (reason: Error) => void,
    ...args: any[]
) {
    try {
        return fn.apply(fn, args);
    } catch (e: any) {
        errorFn(e);
    }
}

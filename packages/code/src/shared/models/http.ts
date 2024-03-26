export type ResponseInfo<T> = {
    success: boolean;
    code: Code;
    data: T | null;
    msg: string;
};
export enum Code {
    SUCCESS = 20000,
    SERVER_UNKNOW = 50000,
    UNKNOW = 99999,
}
export const Message: Record<Code, string> = {
    [Code.SUCCESS]: '请求成功',
    [Code.SERVER_UNKNOW]: '服务器发生未知错误',
    [Code.UNKNOW]: '未知错误',
};

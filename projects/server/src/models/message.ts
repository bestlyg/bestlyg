import { Code } from './code';

export const Message: Record<Code, string> = {
  [Code.SUCCESS]: '请求成功',
  [Code.SERVER_UNKNOW]: '服务器发生未知错误',
  [Code.UNKNOW]: '未知错误',
};

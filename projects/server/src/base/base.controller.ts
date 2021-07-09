import { Code, Message, ResponseInfo } from '@/models';
import { isNumber } from 'lodash';

export class BaseController {
  protected responseClient<T>(promise: Promise<T>): Promise<ResponseInfo<T>> {
    return promise
      .then(
        data =>
          ({
            success: true,
            code: Code.SUCCESS,
            data,
            msg: Message[Code.SUCCESS],
          } as ResponseInfo<T>)
      )
      .catch(err => {
        const code = isNumber(err) ? (err as Code) : Code.UNKNOW;
        return {
          success: false,
          code,
          data: null,
          msg: Message[code],
        };
      });
  }
}

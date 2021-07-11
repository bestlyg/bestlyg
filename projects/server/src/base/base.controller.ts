import { Code, Message } from '@/models';
import { isNumber } from 'lodash';
import { ResponseDto } from './base.dto';

export class BaseController {
  protected async responseClient<T>(promise: Promise<T>): Promise<ResponseDto<T>> {
    return promise
      .then(
        data =>
          ({
            success: true,
            code: Code.SUCCESS,
            data,
            msg: Message[Code.SUCCESS],
          } as ResponseDto<T>)
      )
      .catch(err => {
        console.log(err);
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

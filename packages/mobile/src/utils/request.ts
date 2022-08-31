import { ResponseData } from '@/models';
import Taro from '@tarojs/taro';
import { SERVICE_URL } from './constants';

export async function _request<T extends any = any, U extends any = any>(
  options: Taro.request.Option<any>
) {
  options.url = SERVICE_URL + options.url;
  let header = options.header;
  if (!header) header = options.header = {};
  return Taro.request<T, U>(options).then(res => {
    const { statusCode, data } = res;
    return new Promise<T>((resolve, reject) => {
      if (statusCode >= 200 && statusCode < 400) {
        resolve(data);
      } else {
        Taro.showToast({ title: '网络请求错误,请联系管理员', icon: 'none' });
        reject(statusCode);
      }
    });
  });
}
export function request<T extends any = any, U extends any = any>(
  options: Taro.request.Option<any>
) {
  return _request<ResponseData<T>, U>(options).then(
    ({ success, data, message }) =>
      new Promise<T>((resolve, reject) => {
        if (success) {
          resolve(data);
        } else {
          Taro.showToast({ title: message + '', icon: 'none' });
          reject(message);
        }
      })
  );
}

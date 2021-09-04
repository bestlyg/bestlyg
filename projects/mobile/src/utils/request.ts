import { ResponseData } from '@/models';
import Taro from '@tarojs/taro';
import { SERVICE_URL } from './constants';
import { getStorage } from './storage';

export async function _request<T extends any = any, U extends any = any>(
  options: Taro.request.Option<any>
) {
  options.url = SERVICE_URL + options.url;
  let header = options.header;
  if (!header) header = options.header = {};
  const [token] = getStorage(['token']);
  if (token && !header['Authorization']) header['Authorization'] = `Bearer ${token}`;
  return Taro.request<T, U>(options).then(
    ({ statusCode, data }) =>
      new Promise<T>((resolve, reject) => {
        if (statusCode >= 200 && statusCode < 400) {
          resolve(data);
        } else {
          Taro.showToast({ title: '网络请求错误,请联系管理员', icon: 'none' });
          reject(statusCode);
        }
      })
  );
}
export function request<T extends any = any, U extends any = any>(
  options: Taro.request.Option<any>
) {
  return _request<ResponseData<T>, U>(options).then(
    ({ code, data, msg }) =>
      new Promise<T>((resolve, reject) => {
        code === 0 ? resolve(data) : reject(msg);
      })
  );
}
export function requestImg<U extends any = any>(options: Taro.request.Option<any>) {
  return _request<ArrayBuffer, U>({ ...options, responseType: 'arraybuffer' }).then(
    (res: ArrayBuffer) => Taro.arrayBufferToBase64(res)
  );
}
/** 上传 */
export function uploadFile({ url, filePath }: { url: string; filePath: string }): Promise<string> {
  return Taro.uploadFile({
    url: SERVICE_URL + url,
    filePath,
    name: 'file',
  }).then(
    res =>
      new Promise((resolve, reject) => {
        const { code, data, msg } = JSON.parse(res.data) as ResponseData<string>;
        if (code === 0) {
          resolve('https://cdn.ehelmet.cn/ezm/' + data);
        } else {
          Taro.showToast({ title: msg + '', icon: 'none' });
          reject(msg);
        }
      })
  );
}

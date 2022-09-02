import { request } from '@/utils';

export function login(data: { code: string; encryptedData: string; iv: string }) {
  return request({
    url: '/auth/wechat',
    method: 'POST',
    data,
  });
}

import { Page, pageUrlMap } from '@/app.config';
import { REG_IDCARD, REG_PHONE } from './constants';

export function noop() {}
export function anyop<T>(val: T) {
  return val;
}
export function throwValue(val: any = '') {
  throw val;
}
export function getPageUrl(page: Page, params: Record<string, unknown> = {}) {
  return (
    `/${pageUrlMap.get(page)!}` +
    (Object.keys(params).length === 0 ? '' : '?') +
    Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  );
}
export function transformBase64Img(data: string = '') {
  return `data:image/png;base64,${data}`;
}
export const isPhoneNumber = (phone: string) => REG_PHONE.test(phone);
export const isIdCard = (idcard: string) => REG_IDCARD.test(idcard);

export function arraybufferToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), bit => ('00' + bit.toString(16)).slice(-2))
    .join('');
}

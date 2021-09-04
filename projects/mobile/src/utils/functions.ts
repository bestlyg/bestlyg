import { Page, pageUrlMap } from '@/app.config';

export function getFileSuffix(name: string) {
  return name.split('.').reverse()[0];
}
export function throwValue(val: string) {
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
export function noop() {}

import { Page, pageUrls } from '@/app.config';

export function noop() {}
export function getFileSuffix(name: string) {
  return name.split('.').reverse()[0];
}
export function errorLog(title: string) {
  Taro.showToast({ title: title.toString(), icon: 'none' });
}
export function throwValue(val: string) {
  throw val;
}
export function getPagePath(page: Page, params: Record<string, unknown> = {}) {
  return (
    `/${pageUrls[page]}` +
    (Object.keys(params).length === 0 ? '' : '?') +
    Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  );
}
